import { MaxLength } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class AddWordInput {
  @Field()
  @MaxLength(255)
  language: string;

  @Field()
  @MaxLength(255)
  originalWord: string;

  @Field()
  @MaxLength(255)
  translatedWord: string;

  @Field(() => ID)
  userId: string;
}
