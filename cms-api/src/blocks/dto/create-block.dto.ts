import { ApiProperty } from '@nestjs/swagger';
import { Field, ID, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

import { PublishStatus } from '@prisma/client';

@InputType()
export class CreateBlockDto {
  @ApiProperty()
  @Field(() => ID)
  @IsString()
  pageId!: string;

  @ApiProperty()
  @Field()
  @IsString()
  code!: string;

  @ApiProperty()
  @Field()
  @IsString()
  type!: string;

  @ApiProperty({ type: 'object' })
  @Field(() => GraphQLJSON)
  content!: Record<string, any>;

  @ApiProperty({ required: false })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;

  @ApiProperty({ required: false, default: 1 })
  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  version?: number;
}
