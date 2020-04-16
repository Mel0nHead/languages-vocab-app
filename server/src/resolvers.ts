import { Word } from "./entity/Word";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

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
        .getMany();

      const edges = applyCursorsToEdges(allEdges, before, after);
      const edgesToReturn = getEdgesToReturn(edges, first, last);

      const wordEdges = edgesToReturn.map((word) => {
        return {
          node: word,
          cursor: Buffer.from(word.id.toString()).toString("base64"),
        };
      });

      return {
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
    },
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
    },
  }),
};
