import { Field, ID, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

import { PublishStatus } from '@prisma/client';

@ObjectType()
export class BlockModel {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  pageId!: string;

  @Field()
  code!: string;

  @Field()
  type!: string;

  @Field(() => GraphQLJSON)
  content!: Record<string, any>;

  @Field()
  version!: number;

  @Field(() => String)
  status!: PublishStatus;
}
