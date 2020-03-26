import { Word } from "./entity/Word";

export const resolvers = {
  Query: {
    getAllWords: async (_: any, args: any) => {
      return await Word.find();
    },
    getWordsToReview: async (_: any, args: any) => {
      const { boxes } = args; // will be array of integers
      return await Word.createQueryBuilder("word")
        .where("word.box IN (:...boxes)", {
          boxes: boxes
        })
        .getMany();
    }
  },
  Mutation: {
    addWord: async (_: any, args: any) => {
      try {
        const word = Word.create(args);
        await Word.save(word);
        return true;
      } catch (error) {
        return false;
      }
    },
    deleteWord: async (_: any, args: any) => {
      try {
        const { id } = args;
        await Word.delete(id);
        return true;
      } catch (error) {
        return false;
      }
    },
    updateWord: async (_: any, args: any) => {
      const { id, dateLastSeen, box } = args;
      try {
        let updatedWord = await Word.findOne({ id });
        updatedWord.box = box;
        updatedWord.dateLastSeen = dateLastSeen;
        await Word.save(updatedWord);
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
