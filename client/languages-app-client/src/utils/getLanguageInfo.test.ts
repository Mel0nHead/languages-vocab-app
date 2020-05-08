import { getLanguageInfo } from "./getLanguageInfo";

describe("Function: getLanguageInfo", () => {
  it("should return language info about 'ru'", () => {
    expect(getLanguageInfo("ru")).toEqual({
      language: "Russian",
      languageCode: "ru",
      countryCode: "RU",
    });
  });

  it("should return default object if language code is unknown", () => {
    expect(getLanguageInfo("zz")).toEqual({
      language: "Unknown",
      languageCode: "zz",
      countryCode: "Unknown",
    });
  });
});
