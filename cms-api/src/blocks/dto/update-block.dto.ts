import { PartialType } from '@nestjs/graphql';

import { CreateBlockDto } from './create-block.dto';

export class UpdateBlockDto extends PartialType(CreateBlockDto) {}
