import { Module } from '@nestjs/common';
import UsersModule from './users';
import InterestsModule from './interests';

@Module({
  imports: [
    UsersModule,
    InterestsModule,
  ],
})
export default class GraphModule {}
