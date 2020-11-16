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
import { getLanguageInfo } from "../../../common/utils/getLanguageInfo";
import { FlagIcon } from "../../../common/components/FlagIcon";
import { AnswerType } from "../Test";
import { getWords } from "../../../generated-graphql-interfaces";

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
  handleGetNextQuestion: (
    hasNextPage: boolean,
    cursor: string,
    type: AnswerType
  ) => void;
  cursor: string | null;
  data: getWords;
}

export function TestContent(props: TestContentProps) {
  const {
    data: { getWords },
  } = props;
  const classes = useStyles();
  const [isRevealed, setIsRevealed] = useState(false);
  const currentWord = getWords.edges[0];
  const languageStrings = currentWord.node.language.split("-"); // e.g. ["en", "ru"]
  const originalWordInfo = getLanguageInfo(languageStrings[0]);
  const translatedWordInfo = getLanguageInfo(languageStrings[1]);

  function handleAnswer(answerType: AnswerType) {
    setIsRevealed(false);
    props.handleGetNextQuestion(
      getWords.pageInfo.hasNextPage,
      currentWord.cursor,
      answerType
    );
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
              {currentWord.node.originalWord}
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
              {isRevealed ? currentWord.node.translatedWord : "???"}
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
