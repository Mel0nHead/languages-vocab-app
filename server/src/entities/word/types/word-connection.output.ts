import { Field, Int, ObjectType } from "type-graphql";
import { PageInfo } from "./page-info.ouput";
import { WordEdge } from "./word-edge.output";

@ObjectType()
export class WordConnection {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [WordEdge])
  edges: WordEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
