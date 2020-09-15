import { Word } from "./entity/Word";
import { TestResult } from "./entity/TestResult";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

// TODO: completely refactor this file to get rid of mutability

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
        // TODO: make sure this returns test results for each word
        .orderBy("word.id", "ASC")
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
    getAllTestResults: async (_: any, args: any) => {
      try {
        return TestResult.createQueryBuilder("testResult")
          .orderBy("testResult.dateStarted", "DESC")
          .leftJoinAndSelect("testResult.words", "word")
          .getMany();
      } catch (error) {
        throw new Error(
          "There was an error with the query 'getAllTestResults'"
        );
      }
    },
  },
  Mutation: {
    // mutations relating to WORD entity
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
    },
    // mutations relating to TEST RESULT entity
    createTestResult: async (_: any, args: any) => {
      try {
        const testResult = TestResult.create({
          dateStarted: new Date(),
          dateCompleted: null,
          words: [],
        });
        return TestResult.save(testResult);
      } catch (error) {
        throw new Error(
          "There was an error with the mutation 'createTestResult'"
        );
      }
    },
    updateTestResult: async (_: any, args: any) => {
      const { testResultId, wordId } = args;
      try {
        let testResult = await TestResult.findOne({ id: testResultId });
        let word = await Word.findOne({ id: wordId });
        testResult.words.push(word);
        return TestResult.save(testResult);
      } catch (error) {
        throw new Error(error);
      }
    },
    finishTestResult: async (_: any, args: any) => {
      const { testResultId } = args;
      try {
        let testResult = await TestResult.findOne({ id: testResultId });
        testResult.dateCompleted = new Date();
        return TestResult.save(testResult);
      } catch (error) {
        throw new Error(
          "There was an error with the mutation 'finishTestResult'"
        );
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
