import {
  Query,
  Mutation,
  Resolver,
  Arg,
  ID,
  ResolverInterface,
  FieldResolver,
  Root,
  UseMiddleware,
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
import { isAuthenticated } from "../middleware/isAuthenticated";

@Resolver(Word)
export class WordResolver implements ResolverInterface<Word> {
  @Mutation(() => Word)
  @UseMiddleware(isAuthenticated)
  async createWord(
    @Arg("newWordInput")
    { userId, originalWord, translatedWord, language }: AddWordInput
  ) {
    const user = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.words", "word")
      .where("user.id = :id", { id: parseInt(userId) })
      .getOne();

    const date = new Date();
    const word = Word.create({
      originalWord,
      translatedWord,
      language,
      dateAdded: date,
      dateLastSeen: date,
    });
    await Word.save(word);

    user.words.push(word);
    await User.save(user);
    return word;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteWord(@Arg("wordId", () => ID) wordId: string) {
    let id = parseInt(wordId);
    await Word.delete(id);
    return true;
  }

  @Mutation(() => Word)
  @UseMiddleware(isAuthenticated)
  async updateWord(@Arg("wordId", () => ID) wordId: string) {
    const id = parseInt(wordId);
    let word = await Word.findOne({ id });
    word.dateLastSeen = new Date();
    return Word.save(word);
  }

  @Query(() => WordConnection)
  @UseMiddleware(isAuthenticated)
  async getWords(
    @Arg("getWordsArgs") { first, last, before, after, userId }: GetWordsInput
  ): Promise<WordConnection> {
    const user = await User.createQueryBuilder("user")
      .where("user.id = :id", { id: parseInt(userId) })
      .leftJoinAndSelect("user.words", "word")
      .getOne();

    const filteredWords = applyCursorsToWords(user.words, before, after);
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
      totalCount: user.words.length,
      edges: wordEdges,
      pageInfo: {
        hasPreviousPage: hasPreviousPage(filteredWords, last),
        hasNextPage: hasNextPage(filteredWords, first),
      },
    };
  }

  @FieldResolver()
  @UseMiddleware(isAuthenticated)
  async user(@Root() word: Word): Promise<User> {
    const id = word.id;
    const wordData = await Word.createQueryBuilder("word")
      .leftJoinAndSelect("word.user", "user")
      .where("word.id = :id", { id })
      .getOne();
    return wordData.user;
  }
}
