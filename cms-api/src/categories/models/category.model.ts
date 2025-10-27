import { Field, ID, ObjectType } from '@nestjs/graphql';

import { PublishStatus } from '@prisma/client';

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  slug!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => String)
  status!: PublishStatus;

  @Field(() => [CategoryModel], { nullable: true })
  children?: CategoryModel[];
}
