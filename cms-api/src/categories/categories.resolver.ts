import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryModel } from './models/category.model';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';

@Resolver(() => CategoryModel)
@UseGuards(GqlAuthGuard)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [CategoryModel])
  categories() {
    return this.categoriesService.findAll();
  }

  @Mutation(() => CategoryModel)
  createCategory(@Args('input') input: CreateCategoryDto) {
    return this.categoriesService.create(input);
  }

  @Mutation(() => CategoryModel)
  updateCategory(@Args('id', { type: () => ID }) id: string, @Args('input') input: UpdateCategoryDto) {
    return this.categoriesService.update(id, input);
  }

  @Mutation(() => CategoryModel)
  removeCategory(@Args('id', { type: () => ID }) id: string) {
    return this.categoriesService.remove(id);
  }
}
