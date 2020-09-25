import { Field, ObjectType } from "type-graphql";
import { Word } from "../entity/Word";

@ObjectType()
export class WordEdge {
  @Field(() => Word)
  node: Word;

  @Field()
  cursor: string;
}
