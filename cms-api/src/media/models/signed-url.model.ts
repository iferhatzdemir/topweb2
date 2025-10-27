import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignedUrlResponse {
  @Field()
  uploadUrl!: string;

  @Field()
  assetUrl!: string;

  @Field()
  bucket!: string;

  @Field()
  key!: string;
}
