import { Module } from '@nestjs/common';

import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContentResolver } from './content.resolver';

@Module({
  providers: [ContentService, ContentResolver],
  controllers: [ContentController],
  exports: [ContentService]
})
export class ContentModule {}
