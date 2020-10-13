import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Word } from "./Word";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  createdAt: Date;

  @Field(() => [Word])
  @OneToMany(() => Word, (word) => word.user)
  words: Word[];
}
