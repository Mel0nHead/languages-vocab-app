import {
  Mutation,
  Resolver,
  Arg,
  ID,
  Query,
  FieldResolver,
  Root,
  ResolverInterface,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { User } from "./user.entity";
import { Word } from "../word/word.entity";
import { CreateUserInput } from "./types/create-user.input";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { LoginPayload } from "./types/login.output";
import { Service } from "typedi";
import { UserService } from "./user.service";
import { InjectRepository } from "typeorm-typedi-extensions/decorators/InjectRepository";
import { UserRepository } from "./user.repository";
import { Test } from "../test/test.entity";
import { WordRepository } from "../word/word.repository";

@Resolver(User)
@Service()
export class UserResolver implements ResolverInterface<User> {
  constructor(
    public userService: UserService,
    @InjectRepository()
    private readonly userRepository: UserRepository,
    @InjectRepository()
    private readonly wordRepository: WordRepository
  ) {}

  @Mutation(() => User)
  async createUser(@Arg("createUserInput") createUserInput: CreateUserInput) {
    return this.userRepository
      .create({ ...createUserInput, createdAt: new Date() })
      .save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteUser(@Arg("userId", () => ID) userId: string) {
    const id = parseInt(userId);
    const user = await this.userRepository.getUserWithWords(id);

    const wordIds = user.words.map((word) => word.id);
    if (wordIds.length) {
      await this.wordRepository.delete(wordIds);
    }
    await this.userRepository.delete(id);
    return true;
  }

  @Query(() => User)
  @UseMiddleware(isAuthenticated)
  async getUser(@Arg("userId", () => ID) userId: string) {
    const id = parseInt(userId);
    return this.userRepository.findOne(id);
  }

  @Query(() => [User])
  @UseMiddleware(isAuthenticated)
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  @FieldResolver()
  @UseMiddleware(isAuthenticated)
  async words(@Root() user: User): Promise<Word[]> {
    const id = user.id;
    const userData = await this.userRepository.getUserWithWords(id);
    return userData.words;
  }

  @FieldResolver()
  @UseMiddleware(isAuthenticated)
  async tests(@Root() user: User): Promise<Test[]> {
    const id = user.id;
    const userData = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.tests", "tests")
      .where("user.id = :id", { id })
      .getOne();
    return userData.tests;
  }

  @Mutation(() => LoginPayload, { nullable: true })
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      const user = await this.userRepository.getUserUsingEmailAndPassword(
        email,
        password
      );
      const token = this.userService.generateToken(user);

      return {
        userId: user.id,
        token,
      };
    } catch (e) {
      throw new Error("Invalid email and/or password");
    }
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: { req: { user: { sub: string } } }) {
    try {
      const id = parseInt(req.user.sub);
      const userData = await this.userRepository.findOne(id);
      return userData;
    } catch (e) {
      throw new Error("Please provided an authorization token");
    }
  }
}
