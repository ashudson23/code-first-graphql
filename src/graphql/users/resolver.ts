import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';

import UsersService from './service';
import InterestsService from '../interests/service';

import User from './models/user';
import Interest from '../interests/models/interest';

import CreateUserInput from './dto/createUser.input';
import UsersArgs from './dto/users.args';

@Resolver(() => User)
export default class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly interestsService: InterestsService,
  ) {}

  private readonly event = new PubSub();

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => [User])
  users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.usersService.findAll(usersArgs);
  }

  @ResolveField(() => [Interest])
  async interests(@Parent() user: User) {
    const { interestIds } = user;
    return this.interestsService.findAll({
      skip: 0,
      take: 25,
      interestIds,
    });
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    const user = await this.usersService.create(createUserData);
    this.event.publish('userAdded', { userAdded: user });
    return user;
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  @Subscription(() => User)
  userAdded() {
    return this.event.asyncIterator('userAdded');
  }
}
