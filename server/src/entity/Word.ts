import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

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
  box: number;
}
