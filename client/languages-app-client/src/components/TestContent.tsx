import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  Divider,
  Box,
  Button,
} from "@material-ui/core";
import { getLanguageInfo } from "../utils/getLanguageInfo";
import { FlagIcon } from "./FlagIcon";
import { AnswerType } from "../pages/Test";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(1),
  },
  successButton: {
    backgroundColor: "#339933",
    color: "white",
    margin: theme.spacing(1),
  },
  failureButton: {
    backgroundColor: "#b30000",
    color: "white",
    margin: theme.spacing(1),
  },
  centered: {
    textAlign: "center",
  },
}));

interface TestContentProps {
  handleGetNextQuestion: (hasNextPage: boolean, cursor: string) => void;
  handleScoreChange: (type: AnswerType) => void;
  cursor: string | null;
  data: any;
}

export function TestContent(props: TestContentProps) {
  const classes = useStyles();
  const [isRevealed, setIsRevealed] = useState(false);

  // TODO: use function to extract data (need to have generated types for data first)
  const currentWord = props.data?.getAllWords?.edges[0].node;
  const currentWordCursor = props.data?.getAllWords?.edges[0].cursor;
  const hasNextPage = props.data?.getAllWords.pageInfo.hasNextPage;
  const languageStrings = currentWord.language.split("-"); // e.g. ["en", "ru"]

  const originalWordInfo = getLanguageInfo(languageStrings[0]);
  const translatedWordInfo = getLanguageInfo(languageStrings[1]);

  function handleAnswer(answerType: AnswerType) {
    setIsRevealed(false);
    props.handleGetNextQuestion(hasNextPage, currentWordCursor);
    props.handleScoreChange(answerType);
  }

  return (
    <>
      <Paper data-testid="in-progress-test-container">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.grid}
        >
          <Grid item>
            <Typography data-testid="test-title">
              What is the translation of the word below?
            </Typography>
          </Grid>
          <Grid item>
            <FlagIcon languageInfo={originalWordInfo} />
            <FlagIcon languageInfo={translatedWordInfo} />
          </Grid>
        </Grid>
        <Divider />
        <Box p={2}>
          <Box mb={2}>
            <Typography
              color="textSecondary"
              gutterBottom
              data-testid="test-original-language"
            >
              {originalWordInfo?.language}:
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              data-testid="test-original-word"
            >
              {currentWord.originalWord}
            </Typography>
          </Box>
          <Box>
            <Typography
              color="textSecondary"
              gutterBottom
              data-testid="test-translated-language"
            >
              {translatedWordInfo?.language}:
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              data-testid="test-translated-word"
            >
              {isRevealed ? currentWord.translatedWord : "???"}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={1}>
          <Button
            onClick={() => setIsRevealed(true)}
            color="primary"
            data-testid="reveal-answer-button"
          >
            Reveal answer
          </Button>
        </Box>
      </Paper>
      {isRevealed && (
        <Box
          display="flex"
          justifyContent="center"
          className={classes.centered}
          mt={2}
          data-testid="test-answer-container"
        >
          <div>
            <Typography>Did you get the answer right?</Typography>
            <Box mt={1}>
              <Button
                variant="contained"
                className={classes.successButton}
                onClick={() => handleAnswer("correct")}
                data-testid="yes-button"
              >
                Yes
              </Button>
              <Button
                variant="contained"
                className={classes.failureButton}
                data-testid="no-button"
                onClick={() => handleAnswer("incorrect")}
              >
                No
              </Button>
            </Box>
          </div>
        </Box>
      )}
    </>
  );
}
