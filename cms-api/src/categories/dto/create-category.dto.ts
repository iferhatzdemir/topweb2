import { ApiProperty } from '@nestjs/swagger';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

import { PublishStatus } from '@prisma/client';

@InputType()
export class CreateCategoryDto {
  @ApiProperty()
  @Field()
  @IsString()
  @MinLength(3)
  name!: string;

  @ApiProperty()
  @Field()
  @IsString()
  slug!: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiProperty({ enum: PublishStatus, required: false })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;
}
