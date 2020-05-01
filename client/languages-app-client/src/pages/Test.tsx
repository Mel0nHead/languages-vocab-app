import React, { useState } from "react";
import {
  Typography,
  Button,
  Paper,
  Divider,
  Box,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { useGetNextWordQuery } from "../graphql/useGetNextWordQuery";
import { getLanguageInfo } from "../utils/getLanguageInfo";
import { FlagIcon } from "../components/FlagIcon";

/**
 * TODO:
 * - add styling
 * - add some tests
 * - refactor this mess
 */

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(1),
  },
}));

export function Test() {
  const classes = useStyles();
  const [testInProgress, setTestInProgress] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const { data, error, loading } = useGetNextWordQuery(1, cursor);

  function handleStartAnotherTest() {
    setTestInProgress(true);
    setIsTestFinished(false);
    setCursor(null);
  }

  function handleStartNewTest() {
    setTestInProgress(true);
  }

  function handleGetNextQuestion(hasNextPage: boolean, cursor: string) {
    setIsRevealed(false);
    if (hasNextPage) {
      setCursor(cursor);
    } else {
      setIsTestFinished(true);
      setTestInProgress(false);
    }
  }

  function handleReveal() {
    setIsRevealed(true);
  }

  function getNotInProgressMessage() {
    return (
      <div>
        <Typography>
          Welcome to the test page. To start a test, click the button below.
        </Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartNewTest}
          >
            Start Test
          </Button>
        </div>
      </div>
    );
  }

  function getTestIsFinishedMessage() {
    return (
      <div>
        <Typography>
          You have finished the test! Click the button below to start a new
          test.
        </Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartAnotherTest}
          >
            Start Test
          </Button>
        </div>
      </div>
    );
  }

  function getTestContent() {
    if (error) {
      return <b>An error occurred: {error.message}</b>;
    }

    if (loading) {
      return <b>Loading...</b>;
    }

    const currentWord = data?.getAllWords?.edges[0].node;
    const currentWordCursor = data?.getAllWords?.edges[0].cursor;
    const hasNextPage = data?.getAllWords.pageInfo.hasNextPage;
    const languageStrings = currentWord.language.split("-"); // e.g. ["en", "ru"]

    const originalWordInfo = getLanguageInfo(languageStrings[0]);
    const translatedWordInfo = getLanguageInfo(languageStrings[1]);

    return (
      <>
        <Paper>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.grid}
          >
            <Grid>
              <Typography>
                What is the translation of the word below?
              </Typography>
            </Grid>
            <Grid>
              <FlagIcon languageInfo={originalWordInfo} />
              <FlagIcon languageInfo={translatedWordInfo} />
            </Grid>
          </Grid>
          <Divider />
          <Box p={2}>
            <Box mb={2}>
              <Typography color="textSecondary" gutterBottom>
                {originalWordInfo?.language}:
              </Typography>
              <Typography variant="h5" component="h2">
                {currentWord.originalWord}
              </Typography>
            </Box>
            <Box>
              <Typography color="textSecondary" gutterBottom>
                {translatedWordInfo?.language}:
              </Typography>
              <Typography variant="h5" component="h2">
                {isRevealed ? currentWord.translatedWord : "???"}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box p={1}>
            <Button onClick={handleReveal} color="primary">
              Reveal answer
            </Button>
          </Box>
        </Paper>
        {isRevealed && (
          <Box
            display="flex"
            justifyContent="center"
            style={{ textAlign: "center" }}
            mt={2}
          >
            <div>
              <Typography>Did you get the answer right?</Typography>
              <Box mt={1}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#339933",
                    color: "white",
                    margin: "8px",
                  }}
                  onClick={() =>
                    handleGetNextQuestion(hasNextPage, currentWordCursor)
                  }
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#b30000",
                    color: "white",
                    margin: "8px",
                  }}
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

  return (
    <div>
      <h1>Test</h1>
      <div>
        {!testInProgress && !isTestFinished && getNotInProgressMessage()}
        {!testInProgress && isTestFinished && getTestIsFinishedMessage()}
        {testInProgress && getTestContent()}
      </div>
    </div>
  );
}
