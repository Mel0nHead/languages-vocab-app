import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateTestInput {
  @Field(() => ID)
  userId: string;
}
