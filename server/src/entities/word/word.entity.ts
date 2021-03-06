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
export class Word extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  language: string;

  @Field()
  @Column()
  originalWord: string;

  @Field()
  @Column()
  translatedWord: string;

  @Field()
  @Column()
  dateAdded: Date;

  @Field()
  @Column()
  dateLastSeen: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.words)
  user: User;
}
