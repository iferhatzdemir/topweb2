import { Module } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesResolver } from './categories.resolver';

@Module({
  providers: [CategoriesService, CategoriesResolver],
  controllers: [CategoriesController],
  exports: [CategoriesService]
})
export class CategoriesModule {}
