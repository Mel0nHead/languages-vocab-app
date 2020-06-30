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
  // TODO: remove this 'box' field as it is not needed
  @Column()
  box: number;
}
