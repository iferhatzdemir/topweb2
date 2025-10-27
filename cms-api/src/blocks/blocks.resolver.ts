import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { BlocksService } from './blocks.service';
import { BlockModel } from './models/block.model';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';

@Resolver(() => BlockModel)
@UseGuards(GqlAuthGuard)
export class BlocksResolver {
  constructor(private readonly blocksService: BlocksService) {}

  @Query(() => [BlockModel])
  blocks(@Args('pageId', { type: () => ID, nullable: true }) pageId?: string) {
    return this.blocksService.findAll(pageId);
  }

  @Mutation(() => BlockModel)
  createBlock(@Args('input') input: CreateBlockDto) {
    return this.blocksService.create(input);
  }

  @Mutation(() => BlockModel)
  updateBlock(@Args('id', { type: () => ID }) id: string, @Args('input') input: UpdateBlockDto) {
    return this.blocksService.update(id, input);
  }

  @Mutation(() => BlockModel)
  publishBlock(@Args('id', { type: () => ID }) id: string, @Args('publish') publish: boolean) {
    return this.blocksService.publish(id, publish);
  }
}
