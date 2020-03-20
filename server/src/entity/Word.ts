import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Word {
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
  box: number;
}
