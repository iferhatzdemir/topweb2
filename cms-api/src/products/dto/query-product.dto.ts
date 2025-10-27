import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

import { PublishStatus } from '@prisma/client';

export class QueryProductDto {
  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  take?: number;
}
