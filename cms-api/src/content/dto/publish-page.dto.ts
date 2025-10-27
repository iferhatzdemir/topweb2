import { Field, ID, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class PublishPageDto {
  @Field()
  @IsBoolean()
  publish!: boolean;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  versionId?: string;
}
