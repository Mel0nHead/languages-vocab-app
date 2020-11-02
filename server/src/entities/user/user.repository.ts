import { User } from "./user.entity";
import { Repository, EntityRepository } from "typeorm";
import { Service } from "typedi";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public getUserWithWords(id: number) {
    return this.createQueryBuilder("user")
      .leftJoinAndSelect("user.words", "word")
      .where("user.id = :id", { id })
      .getOne();
  }

  public getUserUsingEmailAndPassword(email: string, password: string) {
    return this.createQueryBuilder("user")
      .where("user.email = :email AND user.password = :password", {
        email,
        password,
      })
      .getOne();
  }
}
