import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductModel, ProductVersionModel } from './models/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PublishProductDto } from './dto/publish-product.dto';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Resolver(() => ProductModel)
@UseGuards(GqlAuthGuard)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [ProductModel])
  products() {
    return this.productsService.findAll({});
  }

  @Query(() => ProductModel)
  product(@Args('id', { type: () => ID }) id: string) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => ProductModel)
  createProduct(@Args('input') input: CreateProductDto, @CurrentUser() user: any) {
    return this.productsService.create(input, user?.sub);
  }

  @Mutation(() => ProductVersionModel)
  createProductVersion(
    @Args('productId', { type: () => ID }) productId: string,
    @Args('input') input: UpdateProductDto,
    @CurrentUser() user: any
  ) {
    return this.productsService.createVersion(productId, input, user?.sub);
  }

  @Mutation(() => ProductModel)
  publishProduct(
    @Args('productId', { type: () => ID }) productId: string,
    @Args('input') input: PublishProductDto
  ) {
    return input.publish
      ? this.productsService.publish(productId, input.versionId)
      : this.productsService.archive(productId);
  }
}
