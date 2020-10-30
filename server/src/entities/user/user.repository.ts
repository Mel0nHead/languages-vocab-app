import { Service } from "typedi";
import { User } from "./user.entity";

export class UserRepository {
  public getUserWithWords(userId: number) {
    return User.createQueryBuilder("user")
      .leftJoinAndSelect("user.words", "word")
      .where("user.id = :id", { userId })
      .getOne();
  }

  public getUser(id: number) {
    return User.findOne(id);
  }

  public getUserUsingEmailAndPassword(email: string, password: string) {
    return User.createQueryBuilder("user")
      .where("user.email = :email AND user.password = :password", {
        email,
        password,
      })
      .getOne();
  }
}
