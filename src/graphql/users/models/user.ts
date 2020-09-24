import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [ID])
  interestIds: string[];
}
