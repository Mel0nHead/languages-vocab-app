import {
  Query,
  Mutation,
  Resolver,
  Arg,
  ID,
  ResolverInterface,
  FieldResolver,
  Root,
} from "type-graphql";
import { Word } from "../entity/Word";
import { AddWordInput } from "../types/AddWordInput";
import { GetWordsInput } from "../types/GetWordsInput";
import { WordConnection } from "../types/WordConnection";
import { WordEdge } from "../types/WordEdge";
import { applyCursorsToWords } from "../utils/applyCursorsToWords";
import { sliceWordsUsingFirstAndLast } from "../utils/sliceWordsUsingFirstAndLast";
import { hasNextPage } from "../utils/hasNextPage";
import { hasPreviousPage } from "../utils/hasPreviousPage";
import { User } from "../entity/User";

@Resolver(Word)
export class WordResolver implements ResolverInterface<Word> {
  @Mutation(() => Word)
  // TODO: rename, and add the word to the specific user
  async createWord(@Arg("newWordInput") newWordInput: AddWordInput) {
    const date = new Date();
    return Word.create({
      ...newWordInput,
      dateAdded: date,
      dateLastSeen: date,
    }).save();
  }

  @Mutation(() => Boolean)
  async deleteWord(@Arg("wordId", () => ID) wordId: string) {
    let id = parseInt(wordId);
    await Word.delete(id);
    return true;
  }

  @Mutation(() => Word)
  async updateWord(@Arg("wordId", () => ID) wordId: string) {
    const id = parseInt(wordId);
    let word = await Word.findOne({ id });
    word.dateLastSeen = new Date();
    return Word.save(word);
  }

  @Query(() => WordConnection)
  async getWords(
    @Arg("getWordsArgs") { first, last, before, after }: GetWordsInput
  ): Promise<WordConnection> {
    const allWords = await Word.createQueryBuilder("word")
      .orderBy("word.id", "ASC")
      .getMany();

    const filteredWords = applyCursorsToWords(allWords, before, after);
    const slicedAndFilteredWords = sliceWordsUsingFirstAndLast(
      filteredWords,
      first,
      last
    );

    const wordEdges: WordEdge[] = slicedAndFilteredWords.map((word) => {
      return {
        node: word,
        cursor: Buffer.from(word.id.toString()).toString("base64"),
      };
    });

    return {
      totalCount: allWords.length,
      edges: wordEdges,
      pageInfo: {
        hasPreviousPage: hasPreviousPage(filteredWords, last),
        hasNextPage: hasNextPage(filteredWords, first),
      },
    };
  }

  @FieldResolver()
  async user(@Root() word: Word): Promise<User> {
    const id = word.id;
    const wordData = await Word.createQueryBuilder("word")
      .leftJoinAndSelect("word.user", "user")
      .where("word.id = :id", { id })
      .getOne();
    return wordData.user;
  }
}
