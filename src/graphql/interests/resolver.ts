import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';

import InterestsService from './service';
import Interest from './models/interest';

import CreateInterestInput from './dto/createInterest.input';
import InterestsArgs from './dto/interests.args';

@Resolver(() => Interest)
export default class InterestsResolver {
  constructor(private readonly interestsService: InterestsService) {}

  private readonly event = new PubSub();

  @Query(() => Interest)
  async interest(@Args('id') id: string): Promise<Interest> {
    const interest = await this.interestsService.findOneById(id);
    if (!interest) {
      throw new NotFoundException(id);
    }
    return interest;
  }

  @Query(() => [Interest])
  interests(@Args() interestsArgs: InterestsArgs): Promise<Interest[]> {
    return this.interestsService.findAll(interestsArgs);
  }

  @Mutation(() => Interest)
  async createInterest(
    @Args('createInterestData') createInterestData: CreateInterestInput,
  ): Promise<Interest> {
    const interest = await this.interestsService.create(createInterestData);
    this.event.publish('interestAdded', { interestAdded: interest });
    return interest;
  }

  @Mutation(() => Boolean)
  async removeInterest(@Args('id') id: string) {
    return this.interestsService.remove(id);
  }

  @Subscription(() => Interest)
  interestAdded() {
    return this.event.asyncIterator('interestAdded');
  }
}
