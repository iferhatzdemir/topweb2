import { Injectable, NotFoundException } from '@nestjs/common';
import { PublishStatus } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';

@Injectable()
export class BlocksService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateBlockDto) {
    return this.prisma.pageBlock.create({
      data: {
        pageId: dto.pageId,
        code: dto.code,
        type: dto.type,
        content: dto.content,
        status: dto.status ?? PublishStatus.DRAFT,
        version: dto.version ?? 1
      }
    });
  }

  findAll(pageId?: string) {
    return this.prisma.pageBlock.findMany({
      where: { pageId },
      orderBy: { updatedAt: 'desc' }
    });
  }

  async findOne(id: string) {
    const block = await this.prisma.pageBlock.findUnique({ where: { id } });
    if (!block) {
      throw new NotFoundException('Block not found');
    }
    return block;
  }

  async update(id: string, dto: UpdateBlockDto) {
    const block = await this.findOne(id);
    return this.prisma.pageBlock.update({
      where: { id },
      data: {
        ...dto,
        version: (dto.version ?? block.version + 1)
      }
    });
  }

  async publish(id: string, publish = true) {
    await this.prisma.pageBlock.update({
      where: { id },
      data: { status: publish ? PublishStatus.PUBLISHED : PublishStatus.DRAFT }
    });
    return this.findOne(id);
  }

  remove(id: string) {
    return this.prisma.pageBlock.delete({ where: { id } });
  }
}
