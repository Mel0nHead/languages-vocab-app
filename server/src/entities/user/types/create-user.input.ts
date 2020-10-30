import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(50)
  name: string;

  @Field()
  @MaxLength(50)
  email: string;

  @Field()
  @MaxLength(50)
  password: string;
}
