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
    // TODO: need to delete all the words that exist on selected User entity
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
}
