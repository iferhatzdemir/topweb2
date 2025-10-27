import { ApiProperty } from '@nestjs/swagger';
import { Field, ID, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateSeoDto {
  @ApiProperty({ required: false })
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  productId?: string;

  @ApiProperty({ required: false })
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  pageId?: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  keywords?: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  canonicalUrl?: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ogImage?: string;

  @ApiProperty({ required: false })
  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  jsonLd?: any;
}
