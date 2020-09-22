import { Word } from "./entity/Word";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { Test } from "./entity/Test";
import { TestToWord } from "./entity/TestToWord";

function applyCursorsToEdges(
  allEdges: Word[],
  before?: string,
  after?: string
) {
  let edges = allEdges;

  if (after) {
    const id = parseInt(Buffer.from(after, "base64").toString());
    edges = allEdges.filter((word) => word.id > id);
  }

  if (before) {
    const id = parseInt(Buffer.from(before, "base64").toString());
    edges = allEdges.filter((word) => word.id < id);
  }
  return edges;
}

function getEdgesToReturn(edges: Word[], first?: number, last?: number) {
  let edgesToReturn = edges;
  if (first) {
    if (first < 0) {
      throw new Error("'First' cannot be less than 0");
    }
    if (edges.length > first) {
      edgesToReturn = edges.slice(0, first);
    }
  }
  if (last) {
    if (last < 0) {
      throw new Error("'Last' cannot be less than 0");
    }
    if (edges.length > last) {
      edgesToReturn = edges.slice(-last);
    }
  }
  return edgesToReturn;
}

function hasPreviousPage(edges: Word[], last: number) {
  if (last) {
    if (edges.length > last) {
      return true;
    }
    // TODO: check if elements exist prior to 'after': if they do, return 'true'
  }
  return false;
}

function hasNextPage(edges: Word[], first: number) {
  if (first) {
    if (edges.length > first) {
      return true;
    }
    // TODO: check if elements exist after 'before': if they do, return 'true'
  }
  return false;
}

export const resolvers = {
  Query: {
    getAllWords: async (_: any, args: any) => {
      const { first, last, after, before } = args;
      const allEdges = await Word.createQueryBuilder("word")
        .orderBy("word.id", "ASC")
        .leftJoinAndSelect("word.testToWords", "testToWord")
        .getMany();

      const edges = applyCursorsToEdges(allEdges, before, after); // slices based on cursor
      const edgesToReturn = getEdgesToReturn(edges, first, last); // return specified number from previous result

      const wordEdges = edgesToReturn.map((word) => {
        return {
          node: word,
          cursor: Buffer.from(word.id.toString()).toString("base64"),
        };
      });

      return {
        totalCount: allEdges.length,
        edges: wordEdges,
        pageInfo: {
          hasPreviousPage: hasPreviousPage(edges, last),
          hasNextPage: hasNextPage(edges, first),
        },
      };
    },
    getWordsToReview: async (_: any, args: any) => {
      const { boxes } = args; // will be array of integers
      return await Word.createQueryBuilder("word")
        .where("word.box IN (:...boxes)", {
          boxes,
        })
        .getMany();
    },
    getAllTests: async (_: any, args: any) => {
      try {
        return Test.createQueryBuilder("test")
          .leftJoinAndSelect("test.testToWords", "testToWord")
          .getMany();
      } catch (e) {
        throw new Error("Error occurred with getAllTests");
      }
    },
  },
  Mutation: {
    addWord: async (_: any, args: any) => {
      try {
        const wordObj = { ...args, testToWords: [] };
        const word = Word.create(wordObj);
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
    },
    createTest: async (_: any, args: any) => {
      try {
        const test = Test.create({
          dateStarted: new Date(),
          dateCompleted: null,
          testToWords: [],
        });
        return Test.save(test);
      } catch (e) {
        throw new Error(e);
      }
    },
    updateTest: async (_: any, args: any) => {
      try {
        const { testId, wordId } = args;
        let word = await Word.createQueryBuilder("word")
          .leftJoinAndSelect("word.testToWords", "testToWord")
          .where("word.id = :id", { id: wordId })
          .getOne();
        let test = await Test.createQueryBuilder("test")
          .leftJoinAndSelect("test.testToWords", "testToWord")
          .where("test.id = :id", { id: testId })
          .getOne();
        const testToWordObj: TestToWord = {
          ...args,
          word,
          test,
        };
        const testToWord = TestToWord.create(testToWordObj);
        // TODO: fix error to do with testId being null
        word.testToWords.push(testToWord);
        test.testToWords.push(testToWord);
        // save all of them
        await Word.save(word);
        await TestToWord.save(testToWord);
        return Test.save(test);
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value received from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
};
