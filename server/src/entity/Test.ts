import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { TestToWord } from "./TestToWord";

@Entity()
export class Test extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateStarted: Date;

  @Column({ nullable: true })
  dateCompleted: Date | null;

  @OneToMany((type) => TestToWord, (testToWord) => testToWord.test)
  testToWords: TestToWord[];
}
