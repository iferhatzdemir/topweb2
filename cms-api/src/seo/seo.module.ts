import { Module } from '@nestjs/common';

import { SeoService } from './seo.service';
import { SeoController } from './seo.controller';
import { SeoResolver } from './seo.resolver';

@Module({
  providers: [SeoService, SeoResolver],
  controllers: [SeoController],
  exports: [SeoService]
})
export class SeoModule {}
