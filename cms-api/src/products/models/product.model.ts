import { Field, Float, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

import { PublishStatus } from '@prisma/client';

@ObjectType()
export class ProductVersionModel {
  @Field(() => ID)
  id!: string;

  @Field()
  versionNumber!: number;

  @Field()
  title!: string;

  @Field({ nullable: true })
  summary?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price!: number;

  @Field()
  currency!: string;

  @Field(() => String)
  status!: PublishStatus;
}

@ObjectType()
export class ProductModel {
  @Field(() => ID)
  id!: string;

  @Field()
  slug!: string;

  @Field(() => String)
  status!: PublishStatus;

  @Field(() => GraphQLISODateTime, { nullable: true })
  publishedAt?: Date;

  @Field(() => [ProductVersionModel])
  versions!: ProductVersionModel[];
}
