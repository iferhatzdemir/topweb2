import { Injectable, NotFoundException } from '@nestjs/common';
import { PublishStatus } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { UpsertMenuItemDto } from './dto/upsert-menu-item.dto';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: {
        title: dto.title,
        code: dto.code,
        status: dto.status ?? PublishStatus.DRAFT
      }
    });
  }

  findAll() {
    return this.prisma.menu.findMany({ include: { items: { orderBy: { ordering: 'asc' } } } });
  }

  async findOne(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: { items: { orderBy: { ordering: 'asc' } } }
    });
    if (!menu) {
      throw new NotFoundException('Menu not found');
    }
    return menu;
  }

  update(id: string, dto: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id },
      data: dto
    });
  }

  async upsertItems(menuId: string, items: UpsertMenuItemDto[]) {
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.menu.findUnique({ where: { id: menuId } });
      if (!existing) {
        throw new NotFoundException('Menu not found');
      }

      await Promise.all(
        items.map((item) =>
          item.id
            ? tx.menuItem.update({
                where: { id: item.id },
                data: {
                  label: item.label,
                  href: item.href,
                  parentId: item.parentId,
                  ordering: item.ordering ?? 0,
                  status: item.status ?? PublishStatus.DRAFT
                }
              })
            : tx.menuItem.create({
                data: {
                  menuId,
                  label: item.label,
                  href: item.href,
                  parentId: item.parentId,
                  ordering: item.ordering ?? 0,
                  status: item.status ?? PublishStatus.DRAFT
                }
              })
        )
      );

      return tx.menu.findUnique({
        where: { id: menuId },
        include: { items: { orderBy: { ordering: 'asc' } } }
      });
    });
  }

  remove(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
