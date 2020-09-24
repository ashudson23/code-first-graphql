import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import GraphModule from './graphql';

@Module({
  imports: [
    GraphModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
    }),
  ],
})
export default class AppModule {}
