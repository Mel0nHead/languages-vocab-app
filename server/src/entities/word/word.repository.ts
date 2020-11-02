import { Repository, EntityRepository } from "typeorm";
import { Service } from "typedi";
import { Word } from "./word.entity";

@Service()
@EntityRepository(Word)
export class WordRepository extends Repository<Word> {
  public createAndSave(
    originalWord: string,
    translatedWord: string,
    language: string
  ) {
    const date = new Date();
    const word = this.create({
      originalWord,
      translatedWord,
      language,
      dateAdded: date,
      dateLastSeen: date,
    });
    return this.save(word);
  }

  public getWordWithUser(id: number) {
    return this.createQueryBuilder("word")
      .leftJoinAndSelect("word.user", "user")
      .where("word.id = :id", { id })
      .getOne();
  }
}
