import React, { useState, useEffect } from "react";
import { useAddWordMutation } from "../graphql/useAddWordMutation";

const yandexUrl = "https://translate.yandex.net/api/v1.5/tr.json";
const yandexApiKey =
  "trnsl.1.1.20200214T093209Z.770ffb3919b46232.ec06ae1560b2b3f7f06a7ee0cb97b88cc777790f";

interface Word {
  language: string;
  originalWord: string;
  translatedWord: string;
  id: number;
}

export function Home() {
  const [inputValue, setInputValue] = useState("");
  const [availableLanguages, setAvailableLanguages] = useState({
    en: "English"
  });
  const [currentLanguage, setCurrentLanguage] = useState({
    source: "en",
    destination: "es"
  });
  const [words, setWords] = useState<Word[]>([]);
  const [addWord] = useAddWordMutation();

  function handleAdd(
    language: string,
    originalWord: string,
    translatedWord: string
  ) {
    const date = new Date();
    addWord({
      variables: {
        language,
        originalWord,
        translatedWord,
        box: 1,
        dateAdded: date,
        dateLastSeen: date
      }
    });
    // TODO: add some sort of state to the word card that lets the user know they've added the card
  }

  function getSupportedLanguages() {
    fetch(`${yandexUrl}/getLangs?key=${yandexApiKey}&ui=en`, { method: "POST" })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(`HTTP Error: ${response.status}`);
        }
      })
      .then(data => {
        console.log(data.langs);
        setAvailableLanguages(data.langs);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getSupportedLanguages();
  }, []);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleLanguageChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    key: "source" | "destination"
  ) {
    const newLanguage = event.target.value;
    setCurrentLanguage(currentLanguage => ({
      ...currentLanguage,
      [key]: newLanguage
    }));
  }

  function handleTranslate() {
    if (!inputValue) return;
    const textToTranslate = encodeURI(inputValue);
    const languageString = `${currentLanguage.source}-${currentLanguage.destination}`; // e.g. en-ru
    fetch(
      `${yandexUrl}/translate?key=${yandexApiKey}&lang=${languageString}&text=${textToTranslate}`,
      { method: "POST" }
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(`HTTP Error: ${response.status}`);
        }
      })
      .then(data => {
        console.log(data);
        const id = Math.random();
        const word = {
          language: languageString,
          originalWord: inputValue,
          translatedWord: data.text[0],
          id
        };
        setWords(currentWords => {
          return [word, ...currentWords];
        });
        setInputValue("");
      })
      .catch(error => {
        console.log(error);
      });
  }

  function getLanguageOptions() {
    return Object.entries(availableLanguages).map(language => {
      return (
        <option key={language[0]} value={language[0]}>
          {language[1]}
        </option>
      );
    });
  }

  return (
    <div>
      <h1>Home</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <div>
        <span>From:</span>
        <select
          value={currentLanguage.source}
          onChange={e => handleLanguageChange(e, "source")}
        >
          {getLanguageOptions()}
        </select>
        <span>To:</span>
        <select
          value={currentLanguage.destination}
          onChange={e => handleLanguageChange(e, "destination")}
        >
          {getLanguageOptions()}
        </select>
      </div>
      <div>
        <button onClick={handleTranslate}>Translate</button>
      </div>
      <div>
        {words.map(word => (
          <div
            key={word.id}
            style={{ border: "1px solid red", marginBottom: "20px" }}
          >
            <span>{`${word.originalWord} - ${word.translatedWord}`}</span>
            <br />
            <span>{word.language}</span>
            <div>
              <button
                onClick={() =>
                  handleAdd(
                    word.language,
                    word.originalWord,
                    word.translatedWord
                  )
                }
              >
                Add to my words
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
