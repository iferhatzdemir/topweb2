import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ContentService } from './content.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PublishPageDto } from './dto/publish-page.dto';

@ApiTags('pages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pages')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePageDto, @CurrentUser() user: any) {
    return this.contentService.create(dto, user?.sub);
  }

  @Post(':id/versions')
  createVersion(@Param('id') id: string, @Body() dto: UpdatePageDto, @CurrentUser() user: any) {
    return this.contentService.createVersion(id, dto, user?.sub);
  }

  @Patch(':id/publish')
  publish(@Param('id') id: string, @Body() dto: PublishPageDto) {
    return dto.publish ? this.contentService.publish(id, dto.versionId) : this.contentService.findOne(id);
  }
}
