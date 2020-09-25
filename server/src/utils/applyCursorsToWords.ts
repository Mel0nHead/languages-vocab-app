import { Word } from "../entity/Word";

function filterWordBasedOnCursor(
  word: Word,
  cursorType: "before" | "after",
  cursor?: string
) {
  if (!cursor) return true;
  const id = parseInt(Buffer.from(cursor, "base64").toString());
  return cursorType === "after" ? word.id > id : word.id < id;
}

export function applyCursorsToWords(
  words: Word[],
  beforeCursor?: string,
  afterCursor?: string
) {
  return words.filter(
    (word) =>
      filterWordBasedOnCursor(word, "after", afterCursor) &&
      filterWordBasedOnCursor(word, "before", beforeCursor)
  );
}
