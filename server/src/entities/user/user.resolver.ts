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

@Resolver(User)
@Service()
export class UserResolver implements ResolverInterface<User> {
  constructor(public userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Arg("createUserInput") createUserInput: CreateUserInput) {
    return User.create({ ...createUserInput, createdAt: new Date() }).save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteUser(@Arg("userId", () => ID) userId: string) {
    const id = parseInt(userId);
    const user = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.words", "word")
      .where("user.id = :id", { id })
      .getOne();

    const wordIds = user.words.map((word) => word.id);
    if (wordIds.length) {
      await Word.delete(wordIds);
    }
    await User.delete(id);
    return true;
  }

  @Query(() => User)
  @UseMiddleware(isAuthenticated)
  async getUser(@Arg("userId", () => ID) userId: string) {
    const id = parseInt(userId);
    return User.findOne({ id });
  }

  @Query(() => [User])
  @UseMiddleware(isAuthenticated)
  async getAllUsers(): Promise<User[]> {
    return User.find();
  }

  @FieldResolver()
  @UseMiddleware(isAuthenticated)
  async words(@Root() user: User): Promise<Word[]> {
    const id = user.id;

    const userData = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.words", "word")
      .where("user.id = :id", { id })
      .getOne();

    return userData.words;
  }

  @Mutation(() => LoginPayload, { nullable: true })
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      const user = await User.createQueryBuilder("user")
        .where("user.email = :email AND user.password = :password", {
          email,
          password,
        })
        .getOne();
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
      const userData = await User.findOne(id);
      return userData;
    } catch (e) {
      throw new Error("Please provided an authorization token");
    }
  }
}
