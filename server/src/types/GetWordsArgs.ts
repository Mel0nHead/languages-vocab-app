import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class GetWordsArgs {
  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => Int, { nullable: true })
  last?: number;

  @Field({ nullable: true })
  after?: string;

  @Field({ nullable: true })
  before?: string;
}
