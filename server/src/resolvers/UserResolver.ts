import { Mutation, Resolver, Arg, ID, Query } from "type-graphql";
import { User } from "../entity/User";
import { CreateUserInput } from "../types/CreateUserInput";

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("createUserInput") createUserInput: CreateUserInput) {
    return User.create({ ...createUserInput, createdAt: new Date() }).save();
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("userId", () => ID) userId: string) {
    const id = parseInt(userId);
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

  // TODO: add a 'words' field resolver
  // https://typegraphql.com/docs/resolvers.html#field-resolvers
}
