import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ContentService } from './content.service';
import { PageModel, PageVersionModel } from './models/page.model';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PublishPageDto } from './dto/publish-page.dto';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Resolver(() => PageModel)
@UseGuards(GqlAuthGuard)
export class ContentResolver {
  constructor(private readonly contentService: ContentService) {}

  @Query(() => [PageModel])
  pages() {
    return this.contentService.findAll();
  }

  @Mutation(() => PageModel)
  createPage(@Args('input') input: CreatePageDto, @CurrentUser() user: any) {
    return this.contentService.create(input, user?.sub);
  }

  @Mutation(() => PageVersionModel)
  createPageVersion(
    @Args('pageId', { type: () => ID }) pageId: string,
    @Args('input') input: UpdatePageDto,
    @CurrentUser() user: any
  ) {
    return this.contentService.createVersion(pageId, input, user?.sub);
  }

  @Mutation(() => PageModel)
  publishPage(@Args('pageId', { type: () => ID }) pageId: string, @Args('input') input: PublishPageDto) {
    return input.publish
      ? this.contentService.publish(pageId, input.versionId)
      : this.contentService.findOne(pageId);
  }
}
