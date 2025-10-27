import { ApiProperty } from '@nestjs/swagger';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

import { PublishStatus } from '@prisma/client';

@InputType()
export class UpsertMenuItemDto {
  @ApiProperty({ required: false })
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ required: false })
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiProperty()
  @Field()
  @IsString()
  label!: string;

  @ApiProperty()
  @Field()
  @IsString()
  href!: string;

  @ApiProperty({ required: false, default: 0 })
  @Field(() => Number, { defaultValue: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  ordering?: number;

  @ApiProperty({ enum: PublishStatus, required: false })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;
}
