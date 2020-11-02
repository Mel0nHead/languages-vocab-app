import jwt from "jsonwebtoken";
import { Service } from "typedi";
import { User } from "./user.entity";

@Service()
export class UserService {
  public generateToken(user: User) {
    return jwt.sign({ hello: user }, "SUPER_SECRET", {
      algorithm: "HS256",
      subject: user.id.toString(),
      expiresIn: "10d",
    });
  }
}
