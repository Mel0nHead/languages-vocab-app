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

export type ChosenLanguage = [string, string] | null;

export interface CurrentLanguage {
  source: ChosenLanguage;
  destination: ChosenLanguage;
}
