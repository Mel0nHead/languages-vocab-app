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
import { Word } from "./word.entity";
import { AddWordInput } from "./types/add-word.input";
import { GetWordsInput } from "./types/get-words.input";
import { WordConnection } from "./types/word-connection.output";
import { User } from "../user/user.entity";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { Service } from "typedi";
import { WordService } from "./word.service";

@Resolver(Word)
@Service()
export class WordResolver implements ResolverInterface<Word> {
  constructor(public wordService: WordService) {}

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
    const paginatedWords = this.wordService.getPaginatedWords(
      user.words,
      first,
      last,
      before,
      after
    );
    return paginatedWords;
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
