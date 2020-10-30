import { Field, ObjectType } from "type-graphql";
import { Word } from "../word.entity";

@ObjectType()
export class WordEdge {
  @Field(() => Word)
  node: Word;

  @Field()
  cursor: string;
}
