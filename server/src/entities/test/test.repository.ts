import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { Test } from "./test.entity";

@Service()
@EntityRepository(Test)
export class TestRepository extends Repository<Test> {
  public getTestWithUser(id: number) {
    return this.createQueryBuilder("test")
      .leftJoinAndSelect("test.user", "user")
      .where("test.id = :id", { id })
      .getOne();
  }

  public createOneAndSave() {
    const now = new Date();
    return this.create({
      createdAt: now,
      updatedAt: now,
      finishedAt: null,
      correctAnswers: 0,
      incorrectAnswers: 0,
    }).save();
  }
}
