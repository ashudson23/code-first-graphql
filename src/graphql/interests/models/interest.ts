import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Interest {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;
}
