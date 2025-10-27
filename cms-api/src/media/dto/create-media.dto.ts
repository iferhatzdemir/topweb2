import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';

import { MediaKind, PublishStatus } from '@prisma/client';

@InputType()
export class CreateMediaDto {
  @ApiProperty({ enum: MediaKind })
  @Field(() => String)
  @IsEnum(MediaKind)
  kind!: MediaKind;

  @ApiProperty()
  @Field()
  @IsString()
  bucket!: string;

  @ApiProperty()
  @Field()
  @IsString()
  key!: string;

  @ApiProperty()
  @Field()
  @IsUrl()
  url!: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  altText?: string;

  @ApiProperty({ required: false })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;
}
