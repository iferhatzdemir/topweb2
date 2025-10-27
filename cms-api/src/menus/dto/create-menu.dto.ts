import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

import { PublishStatus } from '@prisma/client';

@InputType()
export class CreateMenuDto {
  @ApiProperty()
  @Field()
  @IsString()
  @MinLength(3)
  title!: string;

  @ApiProperty()
  @Field()
  @IsString()
  code!: string;

  @ApiProperty({ enum: PublishStatus, required: false })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;
}
