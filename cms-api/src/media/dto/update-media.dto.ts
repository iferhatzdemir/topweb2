import { PartialType } from '@nestjs/graphql';

import { CreateMediaDto } from './create-media.dto';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {}
