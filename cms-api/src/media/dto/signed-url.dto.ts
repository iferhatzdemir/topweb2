import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUrl } from 'class-validator';

@InputType()
export class SignedUrlDto {
  @ApiProperty()
  @Field()
  @IsString()
  fileName!: string;

  @ApiProperty()
  @Field()
  @IsString()
  contentType!: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  callbackUrl?: string;
}
