import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export default class CreateInterest {
  @Field()
  @MaxLength(50)
  title: string;
}
