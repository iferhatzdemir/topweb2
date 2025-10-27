import { ApiProperty } from '@nestjs/swagger';
import { Field, Float, InputType, ID } from '@nestjs/graphql';
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, Min, MinLength } from 'class-validator';

@InputType()
export class CreateProductDto {
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
  summary?: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ default: 'TRY' })
  @Field({ defaultValue: 'TRY' })
  @IsString()
  currency: string = 'TRY';

  @ApiProperty()
  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ type: [String], required: false })
  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  categoryIds?: string[];

  @ApiProperty({ type: [String], required: false })
  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  mediaIds?: string[];
}
