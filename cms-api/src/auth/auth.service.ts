import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

interface GenerateTokenResult {
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  user: {
    id: string;
    email: string;
    displayName: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {}

  async register(dto: RegisterDto): Promise<GenerateTokenResult> {
    const passwordHash = await argon2.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          passwordHash,
          displayName: dto.displayName
        }
      });
      return this.issueTokens(user.id, user.email, user.displayName, null, null);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Email already registered');
      }
      throw error;
    }
  }

  async login(
    dto: LoginDto,
    context: { userAgent?: string; ipAddress?: string | string[] }
  ): Promise<GenerateTokenResult> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await argon2.verify(user.passwordHash, dto.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokens(user.id, user.email, user.displayName, context.userAgent, context.ipAddress);
  }

  async refreshTokens(userId: string, sessionId: string) {
    const session = await this.prisma.userSession.findUnique({ where: { id: sessionId } });
    if (!session || session.userId !== userId) {
      throw new UnauthorizedException('Invalid session');
    }

    if (session.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Session expired');
    }

    return this.issueTokens(userId, undefined, undefined, session.userAgent, session.ipAddress, sessionId);
  }

  async revokeSession(userId: string, sessionId: string) {
    await this.prisma.userSession.deleteMany({ where: { id: sessionId, userId } });
  }

  private async issueTokens(
    userId: string,
    email?: string,
    displayName?: string,
    userAgent?: string,
    ipAddress?: string | string[] | null,
    reuseSessionId?: string | null
  ): Promise<GenerateTokenResult> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const finalEmail = email ?? user?.email;
    const finalDisplayName = displayName ?? user?.displayName ?? '';

    const payload = { sub: userId, email: finalEmail };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.config.get<string>('JWT_ACCESS_TOKEN_TTL', '900s')
    });

    const refreshToken = await this.jwtService.signAsync({ sub: userId }, {
      secret: this.config.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.config.get<string>('JWT_REFRESH_TOKEN_TTL', '7d')
    });

    let session;
    const expiresAt = new Date(Date.now() + this.parseTtl(this.config.get<string>('JWT_REFRESH_TOKEN_TTL', '7d')));
    const refreshTokenHash = await argon2.hash(refreshToken);
    if (reuseSessionId) {
      session = await this.prisma.userSession.update({
        where: { id: reuseSessionId },
        data: {
          refreshTokenHash,
          userAgent,
          ipAddress: Array.isArray(ipAddress) ? ipAddress.join(',') : ipAddress ?? undefined,
          expiresAt
        }
      });
    } else {
      session = await this.prisma.userSession.create({
        data: {
          userId,
          refreshTokenHash,
          userAgent,
          ipAddress: Array.isArray(ipAddress) ? ipAddress.join(',') : ipAddress ?? undefined,
          expiresAt
        }
      });
    }

    return {
      accessToken,
      refreshToken,
      sessionId: session.id,
      user: {
        id: userId,
        email: finalEmail ?? '',
        displayName: finalDisplayName
      }
    };
  }

  private parseTtl(ttl: string): number {
    const match = /^(\d+)([smhd])$/.exec(ttl);
    if (!match) {
      return 7 * 24 * 60 * 60 * 1000;
    }
    const value = parseInt(match[1], 10);
    const unit = match[2];
    const multipliers: Record<string, number> = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000
    };
    return value * multipliers[unit];
  }
}
