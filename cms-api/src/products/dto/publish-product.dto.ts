import { Field, ID, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class PublishProductDto {
  @Field()
  @IsBoolean()
  publish!: boolean;

  @IsOptional()
  @IsString()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  versionId?: string;
}
