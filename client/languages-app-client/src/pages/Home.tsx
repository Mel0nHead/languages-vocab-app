import React, { useState, useEffect } from "react";
import { useAddWordMutation } from "../graphql/useAddWordMutation";
import { TranslateCard } from "../components/TranslateCard";
import { LanguageSelect } from "../components/LanguageSelect";
import { YANDEX_URL, YANDEX_KEY } from "../constants";
import { fetchTranslation } from "../utils/fetchTranslation";
import { createWord } from "../utils/createWord";
import { TextField, Button, Box, makeStyles } from "@material-ui/core";
import { useFetch } from "../hooks/useFetch";

export interface Word {
  language: string;
  originalWord: string;
  translatedWord: string;
  id: string;
}

const useStyles = makeStyles({
  textField: { marginBottom: "5px" },
  yandexLink: { fontSize: "0.8rem" },
});

export function Home() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const {
    data: supportedLanguagesData,
    loading: isSupportedLanguagesLoading,
    error: supportedLanguagesError,
  } = useFetch(`${YANDEX_URL}/getLangs?key=${YANDEX_KEY}&ui=en`, {
    method: "POST",
  });
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
    addWord({
      variables: {
        language: word.language,
        originalWord: word.originalWord,
        translatedWord: word.translatedWord,
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
    return function (
      event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
    ) {
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

    // TODO: create custom useFetch hook so that fetch logic can be extracted out of components
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
      <Box mb={4}>
        <TextField
          variant="filled"
          label="Enter a word to translate"
          placeholder="e.g. dog"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          className={classes.textField}
          data-testid="translate-input"
        />
        <br />
        <span className={classes.yandexLink}>
          Powered by{" "}
          <a
            href="http://translate.yandex.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yandex.Translate
          </a>
        </span>
      </Box>
      <Box mb={2}>
        {isSupportedLanguagesLoading && <b>Loading supported languages...</b>}
        {!isSupportedLanguagesLoading && (
          <>
            <LanguageSelect
              label="From:"
              value={currentLanguage.source}
              handleChange={handleLanguageChange("source")}
              availableLanguages={supportedLanguagesData}
            />
            <LanguageSelect
              label="To:"
              value={currentLanguage.destination}
              handleChange={handleLanguageChange("destination")}
              availableLanguages={supportedLanguagesData}
            />
          </>
        )}
      </Box>
      <div>
        <Button
          variant="contained"
          onClick={handleTranslate}
          color="primary"
          data-testid="translate-btn"
        >
          Translate
        </Button>
      </div>
      <div>
        {words.map((word) => (
          <TranslateCard
            word={word}
            onClick={() => handleAdd(word)}
            key={word.id}
            buttonLabel="Add to my words"
          />
        ))}
      </div>
    </div>
  );
}
