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

  @Column({ nullable: true })
  dateCompleted: Date | null;

  @ManyToMany((type) => Word, (word) => word.correctTestResults, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  correctWords: Word[];

  @ManyToMany((type) => Word, (word) => word.incorrectTestResults, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  incorrectWords: Word[];
}
