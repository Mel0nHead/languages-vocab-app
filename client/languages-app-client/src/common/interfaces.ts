export interface Word {
  language: string;
  originalWord: string;
  translatedWord: string;
  id: string;
}

export interface TranslationResponse {
  code: number;
  lang: string;
  text: string[];
}

export interface LanguageOption {
  code: string;
  name: string;
}

export type ChosenLanguage = LanguageOption | null;

export interface CurrentLanguage {
  source: ChosenLanguage;
  destination: ChosenLanguage;
}
