import { createWord } from "./createWord";

describe("Function: createWord", () => {
  it("should create word from input", () => {
    const data = {
      code: 200,
      lang: "en-es",
      text: ["perro"],
    };
    const word = createWord(data, "en-es", "dog");
    expect(word).toMatchObject({
      language: "en-es",
      originalWord: "dog",
      translatedWord: "perro",
    });
  });

  it("should return default word if data is invalid", () => {
    const data = {
      code: 200,
      lang: "en-es",
    };
    const answer = {
      language: "en-es",
      originalWord: "dog",
      translatedWord: "Unknown",
    };
    const word = createWord(data, "en-es", "dog");
    const word2 = createWord(undefined, "en-es", "dog");
    expect(word).toMatchObject(answer);
    expect(word2).toMatchObject(answer);
  });
});
