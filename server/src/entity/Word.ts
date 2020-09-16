import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { TestToWord } from "./TestToWord";

@Entity()
export class Word extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string;

  @Column()
  originalWord: string;

  @Column()
  translatedWord: string;

  @Column()
  dateAdded: Date;

  @Column()
  dateLastSeen: Date;

  @Column()
  box: number; // remove this at some point

  @OneToMany((type) => TestToWord, (testToWord) => testToWord.word)
  testToWords: TestToWord[];
}
