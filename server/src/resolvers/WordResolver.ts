import { Query, Mutation, Resolver, Arg } from "type-graphql";
import { Word } from "../entity/Word";
import { AddWordInput } from "../input/AddWordInput";

@Resolver(Word)
export class WordResolver {
  @Mutation(() => Word)
  async createWord(@Arg("newWordInput") newWordInput: AddWordInput) {
    const date = new Date();
    return Word.create({
      ...newWordInput,
      dateAdded: date,
      dateLastSeen: date,
    }).save();
  }

  @Mutation(() => Boolean)
  async deleteWord(@Arg("wordId") wordId: number) {
    let id = wordId;
    await Word.delete(id);
    return true;
  }

  @Mutation(() => Word)
  async updateWord(@Arg("wordId") wordId: number) {
    let word = await Word.findOne({ id: wordId });
    word.dateLastSeen = new Date();
    return Word.save(word);
  }

  // TODO: once we know everything is working, then we need to implement pagination for this query
  @Query(() => [Word])
  async getWords() {
    return Word.find();
  }
}
