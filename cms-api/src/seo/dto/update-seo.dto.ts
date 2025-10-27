import { PartialType } from '@nestjs/graphql';

import { CreateSeoDto } from './create-seo.dto';

export class UpdateSeoDto extends PartialType(CreateSeoDto) {}
