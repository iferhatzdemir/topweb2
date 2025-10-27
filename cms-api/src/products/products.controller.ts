import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PublishProductDto } from './dto/publish-product.dto';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto, @CurrentUser() user: any) {
    return this.productsService.create(dto, user?.sub);
  }

  @Get()
  findAll(@Query() query: QueryProductDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post(':id/versions')
  createVersion(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @CurrentUser() user: any
  ) {
    return this.productsService.createVersion(id, dto, user?.sub);
  }

  @Patch(':id/publish')
  publish(@Param('id') id: string, @Body() dto: PublishProductDto) {
    return dto.publish
      ? this.productsService.publish(id, dto.versionId)
      : this.productsService.archive(id);
  }
}
