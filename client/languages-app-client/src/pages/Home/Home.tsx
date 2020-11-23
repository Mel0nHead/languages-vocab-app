import React, { useState } from "react";
import { useAddWordMutation } from "./graphql/useAddWordMutation";
import { TranslateCard } from "../../common/components/TranslateCard";
import { fetchTranslation } from "../../common/utils/fetchTranslation";
import { createWord } from "../../common/utils/createWord";
import { TextField, Button, Box, makeStyles } from "@material-ui/core";
import { ChooseLanguages } from "./components/ChooseLanguages";
import { useSnackbar } from "notistack";
import {
  CurrentLanguage,
  Word,
  ChosenLanguage,
  TranslationResponse,
} from "../../common/interfaces";

const useStyles = makeStyles((theme) => ({
  textField: { marginBottom: "5px" },
  yandexLink: { fontSize: "0.8rem" },
  cardsWrapper: {
    marginTop: theme.spacing(5),
  },
}));

// TODO:
// - change the selects to autocomplete components on home page (and sort the languages alphabetically)
// - improve UI of test page
// - improve UI of test results page

export function Home() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState<CurrentLanguage>({
    source: ["en", "English"],
    destination: ["es", "Spanish"],
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
    return function (_: any, newValue: ChosenLanguage) {
      setCurrentLanguage((currentLanguage) => ({
        ...currentLanguage,
        [key]: newValue,
      }));
    };
  }

  async function handleTranslate() {
    if (!inputValue) return;
    const textToTranslate = encodeURI(inputValue);
    // TODO: refactor
    if (!currentLanguage.source || !currentLanguage.destination) return;
    const languageString = `${currentLanguage.source[0]}-${currentLanguage.destination[0]}`; // e.g. en-ru

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
      <div className={classes.cardsWrapper}>
        {words.map((word) => (
          <TranslateCard
            word={word}
            onClick={() => handleAdd(word)}
            key={word.id}
            buttonLabel="Save"
          />
        ))}
      </div>
    </div>
  );
}
