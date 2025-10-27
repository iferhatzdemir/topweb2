import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateSeoDto } from './dto/create-seo.dto';
import { UpdateSeoDto } from './dto/update-seo.dto';

@Injectable()
export class SeoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSeoDto) {
    if (!dto.productId && !dto.pageId) {
      throw new BadRequestException('productId or pageId must be provided');
    }

    return this.prisma.seoMeta.create({
      data: {
        productId: dto.productId,
        pageId: dto.pageId,
        title: dto.title,
        description: dto.description,
        keywords: dto.keywords,
        canonicalUrl: dto.canonicalUrl,
        ogImage: dto.ogImage,
        jsonLd: dto.jsonLd
      }
    });
  }

  findAll() {
    return this.prisma.seoMeta.findMany();
  }

  async findOne(id: string) {
    const seo = await this.prisma.seoMeta.findUnique({ where: { id } });
    if (!seo) {
      throw new NotFoundException('SEO metadata not found');
    }
    return seo;
  }

  update(id: string, dto: UpdateSeoDto) {
    return this.prisma.seoMeta.update({
      where: { id },
      data: dto
    });
  }

  remove(id: string) {
    return this.prisma.seoMeta.delete({ where: { id } });
  }
}
