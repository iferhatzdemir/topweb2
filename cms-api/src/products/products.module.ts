import { Module } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsResolver } from './products.resolver';

@Module({
  providers: [ProductsService, ProductsResolver],
  controllers: [ProductsController]
})
export class ProductsModule {}
