import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Word } from "./Word";

@Entity()
export class TestResult extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateStarted: Date;

  @Column()
  dateCompleted: Date | null;

  @ManyToMany((type) => Word, (word) => word.testResults, { cascade: true })
  @JoinTable()
  words: Word[];
}
