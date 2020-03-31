import React, { useState, useEffect } from "react";

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
    destination: "en"
  });
  const [words, setWords] = useState<Word[]>([]);

  function getSupportedLanguages() {
    fetch(
      `https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${yandexApiKey}&ui=en`,
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

  function handleSourceLanguageChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const source = event.target.value;
    setCurrentLanguage(currentLanguage => ({
      ...currentLanguage,
      source
    }));
  }

  function handleDestinationLanguageChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const destination = event.target.value;
    setCurrentLanguage(currentLanguage => ({
      ...currentLanguage,
      destination
    }));
  }

  function handleTranslate() {
    if (!inputValue) return;
    const textToTranslate = encodeURI(inputValue);
    const languageString = `${currentLanguage.source}-${currentLanguage.destination}`;
    fetch(
      `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexApiKey}&lang=${languageString}&text=${textToTranslate}`,
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
        const languageString = `${currentLanguage.source}-${currentLanguage.destination}`;
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

  return (
    <div>
      <h1>Home</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <div>
        <span>From:</span>
        <select
          value={currentLanguage.source}
          onChange={handleSourceLanguageChange}
        >
          {Object.entries(availableLanguages).map(language => {
            return (
              <option key={language[0]} value={language[0]}>
                {language[1]}
              </option>
            );
          })}
        </select>
        <span>To:</span>
        <select
          value={currentLanguage.destination}
          onChange={handleDestinationLanguageChange}
        >
          {Object.entries(availableLanguages).map(language => {
            return (
              <option key={language[0]} value={language[0]}>
                {language[1]}
              </option>
            );
          })}
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
          </div>
        ))}
      </div>
    </div>
  );
}
