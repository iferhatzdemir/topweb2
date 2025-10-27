import { Field, ID, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class SeoModel {
  @Field(() => ID)
  id!: string;

  @Field(() => ID, { nullable: true })
  productId?: string;

  @Field(() => ID, { nullable: true })
  pageId?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  keywords?: string;

  @Field({ nullable: true })
  canonicalUrl?: string;

  @Field({ nullable: true })
  ogImage?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  jsonLd?: any;
}
