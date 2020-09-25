import { Query, Mutation, Resolver, Arg } from "type-graphql";
import { Word } from "../entity/Word";
import { AddWordInput } from "../types/AddWordInput";
import { GetWordsArgs } from "../types/GetWordsArgs";
import { WordConnection } from "../types/WordConnection";
import { WordEdge } from "../types/WordEdge";
import { applyCursorsToEdges } from "../utils/applyCursorsToEdges";
import { getEdgesToReturn } from "../utils/getEdgesToReturn";
import { hasNextPage } from "../utils/hasNextPage";
import { hasPreviousPage } from "../utils/hasPreviousPage";

@Resolver(Word)
export class WordResolver {
  @Mutation(() => Word)
  async createWord(@Arg("newWordInput") newWordInput: AddWordInput) {
    const date = new Date();
    return Word.create({
      ...newWordInput,
      dateAdded: date,
      dateLastSeen: date,
    }).save();
  }

  @Mutation(() => Boolean)
  async deleteWord(@Arg("wordId") wordId: number) {
    let id = wordId;
    await Word.delete(id);
    return true;
  }

  @Mutation(() => Word)
  async updateWord(@Arg("wordId") wordId: number) {
    let word = await Word.findOne({ id: wordId });
    word.dateLastSeen = new Date();
    return Word.save(word);
  }

  // TODO: once we know everything is working, then we need to implement pagination for this query
  @Query(() => WordConnection)
  async getWords(
    @Arg("getWordsArgs") { first, last, before, after }: GetWordsArgs
  ): Promise<WordConnection> {
    const allEdges = await Word.createQueryBuilder("word")
      .orderBy("word.id", "ASC")
      .getMany();

    const edges = applyCursorsToEdges(allEdges, before, after); // slices based on cursor
    const edgesToReturn = getEdgesToReturn(edges, first, last); // return specified number from previous result

    const wordEdges: WordEdge[] = edgesToReturn.map((word) => {
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
  }
}
