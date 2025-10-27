import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

import { PublishStatus } from '@prisma/client';

@ObjectType()
export class PageVersionModel {
  @Field(() => ID)
  id!: string;

  @Field()
  versionNumber!: number;

  @Field()
  title!: string;

  @Field({ nullable: true })
  body?: string;

  @Field(() => String)
  status!: PublishStatus;
}

@ObjectType()
export class PageModel {
  @Field(() => ID)
  id!: string;

  @Field()
  slug!: string;

  @Field()
  title!: string;

  @Field(() => String)
  status!: PublishStatus;

  @Field(() => GraphQLISODateTime, { nullable: true })
  publishedAt?: Date;

  @Field(() => [PageVersionModel])
  versions!: PageVersionModel[];
}
