import { PartialType } from '@nestjs/graphql';

import { CreatePageDto } from './create-page.dto';

export class UpdatePageDto extends PartialType(CreatePageDto) {}
