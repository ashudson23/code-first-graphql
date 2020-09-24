import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export default class CreateUser {
  @Field()
  @MaxLength(30)
  name: string;

  @Field(() => [ID])
  interestIds?: string[] = [];
}
