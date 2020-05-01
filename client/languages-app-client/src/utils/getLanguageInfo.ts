import { LANGUAGES_INFO, LanguageInfo } from "../constants";

export function getLanguageInfo(languageCode: string) {
  // e.g. 'ru'
  const language = LANGUAGES_INFO.filter(
    (language) => language.languageCode === languageCode
  );
  return language[0] as LanguageInfo | undefined;
}
