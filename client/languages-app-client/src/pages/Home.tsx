import React, { useState, useEffect } from "react";
import { useAddWordMutation } from "../graphql/useAddWordMutation";
import { TranslateCard } from "../components/TranslateCard";
import { LanguageSelect } from "../components/LanguageSelect";
import { YANDEX_URL, YANDEX_KEY } from "../constants";
import { fetchTranslation } from "../utils/fetchTranslation";
import { createWord } from "../utils/createWord";

export interface Word {
  language: string;
  originalWord: string;
  translatedWord: string;
  id: number;
}

export function Home() {
  const [inputValue, setInputValue] = useState("");
  const [availableLanguages, setAvailableLanguages] = useState({
    en: "English",
  });
  const [currentLanguage, setCurrentLanguage] = useState({
    source: "en",
    destination: "es",
  });
  const [words, setWords] = useState<Word[]>([]);
  const [addWord] = useAddWordMutation();

  function handleAdd(word: Word) {
    const date = new Date();
    addWord({
      variables: {
        language: word.language,
        originalWord: word.originalWord,
        translatedWord: word.translatedWord,
        box: 1,
        dateAdded: date,
        dateLastSeen: date,
      },
    });
    setWords((currentWords) => {
      return currentWords.filter((w) => w.id !== word.id);
    });
  }

  async function getSupportedLanguages() {
    try {
      const res = await fetch(
        `${YANDEX_URL}/getLangs?key=${YANDEX_KEY}&ui=en`,
        { method: "POST" }
      );
      const data = await res.json();
      setAvailableLanguages(data.langs);
    } catch (error) {
      throw new Error("There was an error");
    }
  }

  useEffect(() => {
    getSupportedLanguages();
  }, []);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleLanguageChange(key: "source" | "destination") {
    return function (event: React.ChangeEvent<HTMLSelectElement>) {
      const newLanguage = event.target.value;
      setCurrentLanguage((currentLanguage) => ({
        ...currentLanguage,
        [key]: newLanguage,
      }));
    };
  }

  async function handleTranslate() {
    if (!inputValue) return;
    const textToTranslate = encodeURI(inputValue);
    const languageString = `${currentLanguage.source}-${currentLanguage.destination}`; // e.g. en-ru

    const data = await fetchTranslation(languageString, textToTranslate);
    if (!data) return;

    const word = createWord(data, languageString, inputValue);
    setWords((currentWords) => {
      return [word, ...currentWords];
    });
    setInputValue("");
  }

  return (
    <div>
      <h1>Home</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <br />
      <span>
        Powered by{" "}
        <a
          href="http://translate.yandex.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Yandex.Translate
        </a>
      </span>
      <div>
        <LanguageSelect
          label="From:"
          value={currentLanguage.source}
          handleChange={handleLanguageChange("source")}
          availableLanguages={availableLanguages}
        />
        <LanguageSelect
          label="To:"
          value={currentLanguage.destination}
          handleChange={handleLanguageChange("destination")}
          availableLanguages={availableLanguages}
        />
      </div>
      <div>
        <button onClick={handleTranslate}>Translate</button>
      </div>
      <div>
        {words.map((word) => (
          <TranslateCard word={word} handleAdd={handleAdd} key={word.id} />
        ))}
      </div>
    </div>
  );
}
