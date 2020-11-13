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
  Field,
} from "type-graphql";
import { Word } from "./word.entity";
import { AddWordInput } from "./types/add-word.input";
import { GetWordsInput } from "./types/get-words.input";
import { WordConnection } from "./types/word-connection.output";
import { User } from "../user/user.entity";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { Service } from "typedi";
import { WordService } from "./word.service";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserRepository } from "../user/user.repository";
import { WordRepository } from "./word.repository";

@Resolver(Word)
@Service()
export class WordResolver implements ResolverInterface<Word> {
  constructor(
    public wordService: WordService,
    @InjectRepository()
    private readonly userRepository: UserRepository,
    @InjectRepository()
    private readonly wordRepository: WordRepository
  ) {}

  @Mutation(() => Word)
  @UseMiddleware(isAuthenticated)
  async createWord(
    @Arg("newWordInput")
    { userId, originalWord, translatedWord, language }: AddWordInput
  ) {
    const user = await this.userRepository.getUserWithWords(parseInt(userId));
    const word = await this.wordRepository.createAndSave(
      originalWord,
      translatedWord,
      language
    );
    user.words.push(word);
    await this.userRepository.save(user);
    return word;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteWord(@Arg("wordId", () => ID) wordId: string) {
    let id = parseInt(wordId);
    await this.wordRepository.delete(id);
    return true;
  }

  @Mutation(() => Word)
  @UseMiddleware(isAuthenticated)
  async updateWord(@Arg("wordId", () => ID) wordId: string) {
    const id = parseInt(wordId);
    let word = await this.wordRepository.findOne({ id });
    word.dateLastSeen = new Date();
    return this.wordRepository.save(word);
  }

  @Query(() => WordConnection)
  @UseMiddleware(isAuthenticated)
  async getWords(
    @Arg("getWordsArgs") { first, last, before, after, userId }: GetWordsInput
  ): Promise<WordConnection> {
    const user = await this.userRepository.getUserWithWords(parseInt(userId));
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
    const wordData = await this.wordRepository.getWordWithUser(word.id);
    return wordData.user;
  }

  @Query(() => [Word])
  async getAllWords() {
    return this.wordRepository.find();
  }
}
