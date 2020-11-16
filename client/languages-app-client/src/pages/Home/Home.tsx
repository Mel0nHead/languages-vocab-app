import React, { useState } from "react";
import { useAddWordMutation } from "./graphql/useAddWordMutation";
import { TranslateCard } from "../../common/components/TranslateCard";
import { fetchTranslation } from "../../common/utils/fetchTranslation";
import { createWord } from "../../common/utils/createWord";
import { TextField, Button, Box, makeStyles } from "@material-ui/core";
import { ChooseLanguages } from "./components/ChooseLanguages";
import { useSnackbar } from "notistack";

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

const useStyles = makeStyles({
  textField: { marginBottom: "5px" },
  yandexLink: { fontSize: "0.8rem" },
});

export function Home() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState({
    source: "en",
    destination: "es",
  });
  const [words, setWords] = useState<Word[]>([]);
  const [addWord] = useAddWordMutation();
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function handleAdd(word: Word) {
    try {
      await addWord({
        variables: {
          language: word.language,
          originalWord: word.originalWord,
          translatedWord: word.translatedWord,
          userId: localStorage.getItem("userId") || "",
        },
      });
      setWords((currentWords) => {
        return currentWords.filter((w) => w.id !== word.id);
      });
      enqueueSnackbar("Word successfully added.", { variant: "success" });
    } catch (e) {
      enqueueSnackbar(
        "Something went wrong. Please refresh the page and try again.",
        { variant: "error" }
      );
    }
  }

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

    const data: TranslationResponse | null = await fetchTranslation(
      languageString,
      textToTranslate
    );
    setError(data ? false : true);
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
          variant="outlined"
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
        <ChooseLanguages
          currentLanguage={currentLanguage}
          handleLanguageChange={handleLanguageChange}
        />
      </Box>
      <div>
        <Button
          variant="contained"
          onClick={handleTranslate}
          color="secondary"
          data-testid="translate-btn"
          disableElevation
        >
          Translate
        </Button>
      </div>
      {error && (
        <b>
          An error occurred with the translation. Please refresh the page and
          try again.
        </b>
      )}
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
