import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";
import { Word } from "./Word";
import { Test } from "./Test";

// This is used to specify a many-to-many relationship with custom properties
// TODO: finish off the relationship and add resolvers. Currently following this: https://www.youtube.com/watch?v=8kZ7W-bI5qQ
@Entity()
export class TestToWord extends BaseEntity {
  @PrimaryColumn()
  wordId: number;

  @PrimaryColumn()
  testId: number;

  @Column()
  isWordCorrect: boolean;

  @ManyToOne((type) => Word, (word) => word.testToWords, { primary: true })
  @JoinColumn({ name: "wordId" })
  word: Word;

  @ManyToOne((type) => Test, (test) => test.testToWords, { primary: true })
  @JoinColumn({ name: "testId" })
  test: Test;
}
