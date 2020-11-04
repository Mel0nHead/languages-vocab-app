import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "../user/user.entity";

@ObjectType()
@Entity()
export class Test extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.tests)
  user: User;

  @Field()
  @Column()
  createdAt: Date;

  @Field()
  @Column()
  updatedAt: Date;

  @Field({ nullable: true })
  @Column()
  finishedAt: Date;
}
