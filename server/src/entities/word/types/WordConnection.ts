import { Field, Int, ObjectType } from "type-graphql";
import { PageInfo } from "./PageInfo";
import { WordEdge } from "./WordEdge";

@ObjectType()
export class WordConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [WordEdge])
  edges: WordEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
