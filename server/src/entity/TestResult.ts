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

  // might need to remove manytomany
  @ManyToMany((type) => Word)
  @JoinTable()
  correctWords: Word[];

  // might need to remove manytomany
  @ManyToMany((type) => Word)
  @JoinTable()
  incorrectWords: Word[];
}
