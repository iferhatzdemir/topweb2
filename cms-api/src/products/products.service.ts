import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PublishStatus } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  private mapVersion<T extends { price: Prisma.Decimal }>(version: T) {
    return {
      ...version,
      price: Number(version.price)
    };
  }

  private mapProduct(product: any) {
    if (!product) {
      return product;
    }
    return {
      ...product,
      versions: product.versions?.map((version: any) => this.mapVersion(version)) ?? []
    };
  }

  async create(dto: CreateProductDto, userId?: string) {
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          slug: dto.slug,
          status: PublishStatus.DRAFT,
          versions: {
            create: {
              versionNumber: 1,
              title: dto.title,
              summary: dto.summary,
              description: dto.description,
              price: new Prisma.Decimal(dto.price),
              currency: dto.currency,
              status: PublishStatus.DRAFT,
              createdById: userId
            }
          },
          categories: dto.categoryIds
            ? {
                createMany: {
                  data: dto.categoryIds.map((categoryId) => ({ categoryId }))
                }
              }
            : undefined,
          media: dto.mediaIds
            ? {
                createMany: {
                  data: dto.mediaIds.map((mediaId, index) => ({ mediaId, ordering: index }))
                }
              }
            : undefined
        },
        include: { versions: true, categories: true, media: true }
      });
      return this.mapProduct(product);
    });
  }

  async findAll(query: QueryProductDto) {
    const products = await this.prisma.product.findMany({
      where: {
        status: query.status,
        OR: query.search
          ? [
              { slug: { contains: query.search, mode: 'insensitive' } },
              { versions: { some: { title: { contains: query.search, mode: 'insensitive' } } } }
            ]
          : undefined
      },
      include: {
        versions: {
          orderBy: { versionNumber: 'desc' },
          take: 1
        },
        categories: { include: { category: true } },
        media: { include: { media: true } }
      },
      skip: query.skip,
      take: query.take ?? 20,
      orderBy: { updatedAt: 'desc' }
    });
    return products.map((product) => this.mapProduct(product));
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        versions: { orderBy: { versionNumber: 'desc' } },
        categories: { include: { category: true } },
        media: { include: { media: true } },
        seo: true
      }
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.mapProduct(product);
  }

  async createVersion(productId: string, dto: UpdateProductDto, userId?: string) {
    const product = await this.findOne(productId);
    const nextVersion = product.latestVersion + 1;
    return this.prisma.$transaction(async (tx) => {
      const version = await tx.productVersion.create({
        data: {
          productId,
          versionNumber: nextVersion,
          title: dto.title ?? product.versions[0]?.title ?? 'Untitled',
          summary: dto.summary ?? product.versions[0]?.summary,
          description: dto.description ?? product.versions[0]?.description,
          price: dto.price !== undefined ? new Prisma.Decimal(dto.price) : product.versions[0]?.price ?? new Prisma.Decimal(0),
          currency: dto.currency ?? product.versions[0]?.currency ?? 'TRY',
          status: PublishStatus.DRAFT,
          createdById: userId
        }
      });

      await tx.product.update({
        where: { id: productId },
        data: {
          latestVersion: nextVersion,
          categories: dto.categoryIds
            ? {
                deleteMany: {},
                createMany: {
                  data: dto.categoryIds.map((categoryId) => ({ categoryId }))
                }
              }
            : undefined,
          media: dto.mediaIds
            ? {
                deleteMany: {},
                createMany: {
                  data: dto.mediaIds.map((mediaId, index) => ({ mediaId, ordering: index }))
                }
              }
            : undefined
        }
      });

      return this.mapVersion(version);
    });
  }

  async publish(productId: string, versionId?: string) {
    const product = await this.findOne(productId);
    const targetVersion = versionId
      ? await this.prisma.productVersion.findUnique({ where: { id: versionId } })
      : await this.prisma.productVersion.findFirst({
          where: { productId },
          orderBy: { versionNumber: 'desc' }
        });
    if (!targetVersion) {
      throw new NotFoundException('Version not found');
    }

    await this.prisma.product.update({
      where: { id: productId },
      data: {
        status: PublishStatus.PUBLISHED,
        publishedAt: new Date(),
        publishedVersion: targetVersion.versionNumber
      }
    });

    await this.prisma.productVersion.update({
      where: { id: targetVersion.id },
      data: { status: PublishStatus.PUBLISHED }
    });

    return this.findOne(productId);
  }

  async archive(productId: string) {
    await this.prisma.product.update({
      where: { id: productId },
      data: { status: PublishStatus.ARCHIVED }
    });
    return this.findOne(productId);
  }
}
