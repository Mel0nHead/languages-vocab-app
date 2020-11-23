import { TranslationResponse, Word } from "../interfaces";

export function createWord(
  data: TranslationResponse,
  language: string,
  originalWord: string
): Word {
  const id = Math.random().toString();

  const obj = {
    language,
    id,
    originalWord,
    translatedWord: "Unknown",
  };

  if (!data.text) {
    return obj;
  }

  return {
    ...obj,
    translatedWord: data.text[0],
  };
}
