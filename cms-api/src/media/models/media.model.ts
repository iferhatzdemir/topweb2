import { Field, ID, ObjectType } from '@nestjs/graphql';

import { MediaKind, PublishStatus } from '@prisma/client';

@ObjectType()
export class MediaModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  kind!: MediaKind;

  @Field()
  bucket!: string;

  @Field()
  key!: string;

  @Field()
  url!: string;

  @Field({ nullable: true })
  altText?: string;

  @Field(() => String)
  status!: PublishStatus;
}
