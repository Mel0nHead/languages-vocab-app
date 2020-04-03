import { Word } from "../pages/Home";

export function createWord(
  data: any,
  language: string,
  originalWord: string
): Word {
  const id = Math.random();
  return {
    language,
    id,
    originalWord,
    translatedWord: data.text[0],
  };
}
