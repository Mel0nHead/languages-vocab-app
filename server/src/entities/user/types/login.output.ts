import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class LoginPayload {
  @Field(() => ID)
  userId: string;

  @Field()
  token: string;
}
