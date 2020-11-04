import {
  Arg,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { User } from "../user/user.entity";
import { Test } from "./test.entity";
import { CreateTestInput } from "./types/create-test.input";

@Resolver(Test)
@Service()
export class TestResolver implements ResolverInterface<Test> {
  @FieldResolver()
  @UseMiddleware(isAuthenticated)
  async user(@Root() test: Test): Promise<User> {
    const { id } = test;
    const testData = await Test.createQueryBuilder("test")
      .leftJoinAndSelect("test.user", "user")
      .where("test.id = :id", { id })
      .getOne();
    return testData.user;
  }

  @Mutation(() => Test)
  @UseMiddleware(isAuthenticated)
  async createTest(@Arg("createTestInput") { userId }: CreateTestInput) {
    const id = parseInt(userId);
    const user = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.tests", "test")
      .where("user.id = :id", { id })
      .getOne();
    const date = new Date();
    const test = await Test.create({
      createdAt: date,
      updatedAt: date,
    }).save();
    user.tests.push(test);
    await User.save(user);
    return test;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteTest(@Arg("testId", () => ID) testId: string) {
    let id = parseInt(testId);
    await Test.delete(id);
    return true;
  }

  @Mutation(() => Test)
  @UseMiddleware(isAuthenticated)
  async updateTest(
    @Arg("testId", () => ID) testId: string,
    @Arg("completed", () => Boolean) completed?: boolean
  ) {
    const id = parseInt(testId);
    let test = await Test.findOne({ id });
    const date = new Date();
    test.updatedAt = date;
    if (completed) {
      test.finishedAt = date;
    }
    return Test.save(test);
  }

  // TODO: add getTests query
}
