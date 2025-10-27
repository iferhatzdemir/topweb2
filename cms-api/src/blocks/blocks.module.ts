import { Module } from '@nestjs/common';

import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { BlocksResolver } from './blocks.resolver';

@Module({
  providers: [BlocksService, BlocksResolver],
  controllers: [BlocksController],
  exports: [BlocksService]
})
export class BlocksModule {}
