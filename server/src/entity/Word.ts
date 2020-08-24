import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import { TestResult } from "./TestResult";

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
  // TODO: remove this 'box' field as it is not needed
  @Column()
  box: number;

  @ManyToMany((type) => TestResult, (testResult) => testResult.words)
  testResults: TestResult[];
}
