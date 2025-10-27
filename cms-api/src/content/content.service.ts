import { Injectable, NotFoundException } from '@nestjs/common';
import { PublishStatus } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePageDto, userId?: string) {
    return this.prisma.$transaction(async (tx) => {
      const page = await tx.page.create({
        data: {
          slug: dto.slug,
          title: dto.title,
          status: dto.status ?? PublishStatus.DRAFT,
          versions: {
            create: {
              versionNumber: 1,
              title: dto.title,
              body: dto.body,
              status: dto.status ?? PublishStatus.DRAFT,
              createdById: userId
            }
          }
        },
        include: { versions: true }
      });
      return page;
    });
  }

  findAll() {
    return this.prisma.page.findMany({
      include: {
        versions: { orderBy: { versionNumber: 'desc' }, take: 1 },
        blocks: true,
        seo: true
      }
    });
  }

  async findOne(id: string) {
    const page = await this.prisma.page.findUnique({
      where: { id },
      include: {
        versions: { orderBy: { versionNumber: 'desc' } },
        blocks: true,
        seo: true
      }
    });
    if (!page) {
      throw new NotFoundException('Page not found');
    }
    return page;
  }

  async createVersion(id: string, dto: UpdatePageDto, userId?: string) {
    const page = await this.findOne(id);
    const nextVersion = page.latestVersion + 1;
    const version = await this.prisma.pageVersion.create({
      data: {
        pageId: id,
        versionNumber: nextVersion,
        title: dto.title ?? page.title,
        body: dto.body ?? page.versions[0]?.body,
        status: PublishStatus.DRAFT,
        createdById: userId
      }
    });

    await this.prisma.page.update({
      where: { id },
      data: {
        title: dto.title ?? page.title,
        latestVersion: nextVersion,
        status: PublishStatus.DRAFT
      }
    });

    return version;
  }

  async publish(id: string, versionId?: string) {
    const version = versionId
      ? await this.prisma.pageVersion.findUnique({ where: { id: versionId } })
      : await this.prisma.pageVersion.findFirst({
          where: { pageId: id },
          orderBy: { versionNumber: 'desc' }
        });
    if (!version) {
      throw new NotFoundException('Page version not found');
    }

    await this.prisma.page.update({
      where: { id },
      data: {
        status: PublishStatus.PUBLISHED,
        publishedAt: new Date(),
        title: version.title,
        latestVersion: version.versionNumber
      }
    });

    await this.prisma.pageVersion.update({
      where: { id: version.id },
      data: { status: PublishStatus.PUBLISHED }
    });

    return this.findOne(id);
  }
}
