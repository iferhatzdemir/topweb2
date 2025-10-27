import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

import { PublishStatus } from '@prisma/client';

@InputType()
export class CreatePageDto {
  @ApiProperty()
  @Field()
  @IsString()
  slug!: string;

  @ApiProperty()
  @Field()
  @IsString()
  @MinLength(3)
  title!: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  body?: string;

  @ApiProperty({ enum: PublishStatus, required: false })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;
}
