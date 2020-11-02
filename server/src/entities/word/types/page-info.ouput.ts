import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class PageInfo {
  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;
}
