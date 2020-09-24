import { Query, Resolver } from "type-graphql";
import { Word } from "../entity/Word";

@Resolver(Word)
class WordResolver {
  //   constructor(private recipeService: RecipeService) {} not sure if needed
  @Query(() => Word)
}
