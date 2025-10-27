import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { MenusService } from './menus.service';
import { MenuModel } from './models/menu.model';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { UpsertMenuItemDto } from './dto/upsert-menu-item.dto';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';

@Resolver(() => MenuModel)
@UseGuards(GqlAuthGuard)
export class MenusResolver {
  constructor(private readonly menusService: MenusService) {}

  @Query(() => [MenuModel])
  menus() {
    return this.menusService.findAll();
  }

  @Mutation(() => MenuModel)
  createMenu(@Args('input') input: CreateMenuDto) {
    return this.menusService.create(input);
  }

  @Mutation(() => MenuModel)
  updateMenu(@Args('id', { type: () => ID }) id: string, @Args('input') input: UpdateMenuDto) {
    return this.menusService.update(id, input);
  }

  @Mutation(() => MenuModel)
  upsertMenuItems(
    @Args('id', { type: () => ID }) id: string,
    @Args({ name: 'items', type: () => [UpsertMenuItemDto] }) items: UpsertMenuItemDto[]
  ) {
    return this.menusService.upsertItems(id, items);
  }
}
