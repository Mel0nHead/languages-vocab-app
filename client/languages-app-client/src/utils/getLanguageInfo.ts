import { LANGUAGES_INFO, LanguageInfo } from "../constants";

export function getLanguageInfo(languageCode: string) {
  // e.g. 'ru'
  const language = LANGUAGES_INFO.filter(
    (language) => language.languageCode === languageCode
  );

  const unknownInfo: LanguageInfo = {
    language: "Unknown",
    languageCode,
    countryCode: "Unknown",
  };

  return language[0] || unknownInfo;
}
