import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);

  await app.listen(53373);
  console.log(`Application is running on: ${await app.getUrl()}/graphql`);
})();
