import { Word } from "./entity/Word";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

export const resolvers = {
  Query: {
    getAllWords: async (_: any, args: any) => {
      return await Word.find();
    },
    getWordsToReview: async (_: any, args: any) => {
      const { boxes } = args; // will be array of integers
      return await Word.createQueryBuilder("word")
        .where("word.box IN (:...boxes)", {
          boxes
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
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  })
};
