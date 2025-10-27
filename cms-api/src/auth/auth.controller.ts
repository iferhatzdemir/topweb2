import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshDto } from './dto/refresh.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthRequest } from '../common/types/auth-request.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const { accessToken, refreshToken, user, sessionId } = await this.authService.register(dto);
    return { accessToken, refreshToken, sessionId, user };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Req() request: AuthRequest) {
    const userAgent = request.headers['user-agent'];
    const ipAddress = request.ip;
    return this.authService.login(dto, { userAgent, ipAddress });
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() request: AuthRequest, @Body() dto: RefreshDto) {
    return this.authService.refreshTokens(request.user.sub, dto.sessionId);
  }

  @Post('logout')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() request: AuthRequest, @Body() dto: RefreshDto) {
    await this.authService.revokeSession(request.user.sub, dto.sessionId);
    return;
  }
}
