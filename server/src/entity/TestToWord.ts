import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Word } from "./Word";
import { Test } from "./Test";

// This is used to specify a many-to-many relationship with custom properties
@Entity()
export class TestToWord extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  testId: number;

  @Column()
  wordId: number;

  @Column()
  isWordCorrect: boolean;

  @ManyToOne((type) => Word, (word) => word.testToWords)
  word: Word;

  @ManyToOne((type) => Test, (test) => test.testToWords)
  test: Test;
}
