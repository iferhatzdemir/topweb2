import { Field, ID, ObjectType } from '@nestjs/graphql';

import { PublishStatus } from '@prisma/client';

@ObjectType()
export class MenuItemModel {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  parentId?: string;

  @Field()
  label!: string;

  @Field()
  href!: string;

  @Field()
  ordering!: number;

  @Field(() => String)
  status!: PublishStatus;
}

@ObjectType()
export class MenuModel {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  code!: string;

  @Field(() => String)
  status!: PublishStatus;

  @Field(() => [MenuItemModel], { nullable: true })
  items?: MenuItemModel[];
}
