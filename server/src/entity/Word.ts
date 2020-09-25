import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Word extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  language: string;

  @Field()
  @Column()
  originalWord: string;

  @Field()
  @Column()
  translatedWord: string;

  @Field()
  @Column()
  dateAdded: Date;

  @Field()
  @Column()
  dateLastSeen: Date;
}
