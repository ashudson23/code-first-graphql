import { Module } from '@nestjs/common';
import InterestsResolver from './resolver';
import InterestsService from './service';

@Module({
  providers: [
    InterestsResolver,
    InterestsService,
  ],
})
export default class InterestsModule {}
