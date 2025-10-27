import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { SeoService } from './seo.service';
import { SeoModel } from './models/seo.model';
import { CreateSeoDto } from './dto/create-seo.dto';
import { UpdateSeoDto } from './dto/update-seo.dto';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';

@Resolver(() => SeoModel)
@UseGuards(GqlAuthGuard)
export class SeoResolver {
  constructor(private readonly seoService: SeoService) {}

  @Query(() => [SeoModel])
  seoRecords() {
    return this.seoService.findAll();
  }

  @Mutation(() => SeoModel)
  createSeo(@Args('input') input: CreateSeoDto) {
    return this.seoService.create(input);
  }

  @Mutation(() => SeoModel)
  updateSeo(@Args('id', { type: () => ID }) id: string, @Args('input') input: UpdateSeoDto) {
    return this.seoService.update(id, input);
  }
}
