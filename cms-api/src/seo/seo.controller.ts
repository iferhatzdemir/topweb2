import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SeoService } from './seo.service';
import { CreateSeoDto } from './dto/create-seo.dto';
import { UpdateSeoDto } from './dto/update-seo.dto';

@ApiTags('seo')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get()
  findAll() {
    return this.seoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seoService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateSeoDto) {
    return this.seoService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSeoDto) {
    return this.seoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seoService.remove(id);
  }
}
