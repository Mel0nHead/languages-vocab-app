import { Service } from "typedi";
import { WordConnection } from "./types/word-connection.output";
import { WordEdge } from "./types/word-edge.output";
import { Word } from "./word.entity";

@Service()
export class WordService {
  private filterWordBasedOnCursor(
    word: Word,
    cursorType: "before" | "after",
    cursor?: string
  ) {
    if (!cursor) return true;
    const id = parseInt(Buffer.from(cursor, "base64").toString());
    return cursorType === "after" ? word.id > id : word.id < id;
  }

  private sliceWordsUsingFirst(words: Word[], first?: number) {
    if (first && first > 0 && words.length > first) {
      return words.slice(0, first);
    }
    return words;
  }

  private hasNextPage(edges: Word[], first?: number) {
    if (first) {
      if (edges.length > first) {
        return true;
      }
      // TODO: check if elements exist after 'before': if they do, return 'true'
    }
    return false;
  }

  private hasPreviousPage(edges: Word[], last?: number) {
    if (last) {
      if (edges.length > last) {
        return true;
      }
      // TODO: check if elements exist prior to 'after': if they do, return 'true'
    }
    return false;
  }

  private applyCursorsToWords(
    words: Word[],
    beforeCursor?: string,
    afterCursor?: string
  ) {
    return words.filter(
      (word) =>
        this.filterWordBasedOnCursor(word, "after", afterCursor) &&
        this.filterWordBasedOnCursor(word, "before", beforeCursor)
    );
  }

  private sliceWordsUsingLast(words: Word[], last?: number) {
    if (last && last > 0 && words.length > last) {
      return words.slice(-last);
    }
    return words;
  }

  private sliceWordsUsingFirstAndLast(
    words: Word[],
    first?: number,
    last?: number
  ) {
    const slicedWords = this.sliceWordsUsingFirst(words, first);
    return this.sliceWordsUsingLast(slicedWords, last);
  }

  private mapWordsToWordEdges(
    words: Word[],
    first?: number,
    last?: number
  ): WordEdge[] {
    const slicedWords = this.sliceWordsUsingFirstAndLast(words, first, last);

    return slicedWords.map((word) => {
      return {
        node: word,
        cursor: Buffer.from(word.id.toString()).toString("base64"),
      };
    });
  }

  public getPaginatedWords(
    words: Word[],
    first?: number,
    last?: number,
    before?: string,
    after?: string
  ): WordConnection {
    const filteredWords = this.applyCursorsToWords(words, before, after);
    const wordEdges = this.mapWordsToWordEdges(filteredWords, first, last);

    return {
      totalCount: words.length,
      edges: wordEdges,
      pageInfo: {
        hasPreviousPage: this.hasPreviousPage(filteredWords, last),
        hasNextPage: this.hasNextPage(filteredWords, first),
      },
    };
  }
}
