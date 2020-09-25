import { Word } from "../entity/Word";

function sliceWordsUsingFirst(words: Word[], first?: number) {
  if (first && first > 0 && words.length > first) {
    return words.slice(0, first);
  }
  return words;
}

function sliceWordsUsingLast(words: Word[], last?: number) {
  if (last && last > 0 && words.length > last) {
    return words.slice(-last);
  }
  return words;
}

export function sliceWordsUsingFirstAndLast(
  words: Word[],
  first?: number,
  last?: number
) {
  const slicedWords = sliceWordsUsingFirst(words, first);
  return sliceWordsUsingLast(slicedWords, last);
}
