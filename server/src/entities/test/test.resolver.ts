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
import { InjectRepository } from "typeorm-typedi-extensions";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { User } from "../user/user.entity";
import { UserRepository } from "../user/user.repository";
import { Test } from "./test.entity";
import { TestRepository } from "./test.repository";
import { TestService } from "./test.service";
import { CreateTestInput } from "./types/create-test.input";

@Resolver(Test)
@Service()
export class TestResolver implements ResolverInterface<Test> {
  constructor(
    public testService: TestService,
    @InjectRepository()
    private readonly testRepository: TestRepository,
    @InjectRepository()
    private readonly userRepository: UserRepository
  ) {}

  @FieldResolver()
  @UseMiddleware(isAuthenticated)
  async user(@Root() test: Test): Promise<User> {
    const { id } = test;
    const testData = await this.testRepository.getTestWithUser(id);
    return testData.user;
  }

  @Mutation(() => Test)
  @UseMiddleware(isAuthenticated)
  async createTest(@Arg("createTestInput") { userId }: CreateTestInput) {
    const id = parseInt(userId);
    const user = await this.userRepository.getUserWithTests(id);
    const test = await this.testRepository.createOneAndSave();
    user.tests.push(test);
    await this.userRepository.save(user);
    return test;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteTest(@Arg("testId", () => ID) testId: string) {
    let id = parseInt(testId);
    await this.testRepository.delete(id);
    return true;
  }

  @Mutation(() => Test)
  @UseMiddleware(isAuthenticated)
  async updateTest(
    @Arg("testId", () => ID) testId: string,
    @Arg("isAnswerCorrect", () => Boolean) isAnswerCorrect: boolean,
    @Arg("completed", () => Boolean) completed?: boolean
  ) {
    const id = parseInt(testId);
    let test = await this.testRepository.findOne({ id });
    const testWithUpdatedDates = this.testService.updateTimestamps(
      test,
      completed
    );
    const fullyUpdatedTest = this.testService.updateAnswers(
      testWithUpdatedDates as Test,
      isAnswerCorrect
    );
    return this.testRepository.save(fullyUpdatedTest);
  }

  @Query(() => [Test])
  @UseMiddleware(isAuthenticated)
  async getTests(@Arg("userId", () => ID) userId: string) {
    const id = parseInt(userId);
    const user = await this.userRepository.getUserWithTests(id);
    return user.tests;
  }

  @Query(() => [Test])
  async getAllTests() {
    return this.testRepository.find();
  }
}
