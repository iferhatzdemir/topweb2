import { Module } from '@nestjs/common';

import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { MenusResolver } from './menus.resolver';

@Module({
  providers: [MenusService, MenusResolver],
  controllers: [MenusController],
  exports: [MenusService]
})
export class MenusModule {}
