import { Module } from '@nestjs/common';
import UsersResolver from './resolver';
import UsersService from './service';
import InterestsService from '../interests/service';

@Module({
  providers: [
    UsersResolver,
    UsersService,
    InterestsService,
  ],
})
export default class UsersModule {}
