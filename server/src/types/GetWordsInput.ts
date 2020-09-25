import { ArgsType, Field, InputType, Int } from "type-graphql";

@InputType()
export class GetWordsInput {
  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => Int, { nullable: true })
  last?: number;

  @Field({ nullable: true })
  after?: string;

  @Field({ nullable: true })
  before?: string;
}
