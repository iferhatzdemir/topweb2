import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { MediaService } from './media.service';
import { MediaModel } from './models/media.model';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { SignedUrlDto } from './dto/signed-url.dto';
import { SignedUrlResponse } from './models/signed-url.model';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';

@Resolver(() => MediaModel)
@UseGuards(GqlAuthGuard)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => [MediaModel])
  mediaAssets() {
    return this.mediaService.findAll();
  }

  @Mutation(() => MediaModel)
  createMedia(@Args('input') input: CreateMediaDto) {
    return this.mediaService.create(input);
  }

  @Mutation(() => MediaModel)
  updateMedia(@Args('id', { type: () => ID }) id: string, @Args('input') input: UpdateMediaDto) {
    return this.mediaService.update(id, input);
  }

  @Mutation(() => SignedUrlResponse)
  mediaSignedUrl(@Args('input') input: SignedUrlDto) {
    return this.mediaService.signedUpload(input);
  }
}
