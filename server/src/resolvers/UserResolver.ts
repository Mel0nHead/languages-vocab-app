import {
  Mutation,
  Resolver,
  Arg,
  ID,
  Query,
  FieldResolver,
  Root,
  ResolverInterface,
} from "type-graphql";
import { User } from "../entity/User";
import { Word } from "../entity/Word";
import { CreateUserInput } from "../types/CreateUserInput";

@Resolver(User)
export class UserResolver implements ResolverInterface<User> {
  @Mutation(() => User)
  async createUser(@Arg("createUserInput") createUserInput: CreateUserInput) {
    return User.create({ ...createUserInput, createdAt: new Date() }).save();
  }

  @Mutation(() => Boolean)
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
  async getUser(@Arg("userId", () => ID) userId: string) {
    const id = parseInt(userId);
    return User.findOne({ id });
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return User.find();
  }

  @FieldResolver()
  async words(@Root() user: User): Promise<Word[]> {
    const id = user.id;

    const userData = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.words", "word")
      .where("user.id = :id", { id })
      .getOne();

    return userData.words;
  }

  @Mutation(() => User, { nullable: true })
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      const user = await User.createQueryBuilder("user")
        .where("user.email = :email AND user.password = :password", {
          email,
          password,
        })
        .getOne();
      return user;
    } catch (e) {
      throw new Error("Invalid email and/or password");
    }
  }
}
