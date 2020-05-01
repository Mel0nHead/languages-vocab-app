import React, { useState } from "react";
import {
  Typography,
  Button,
  Paper,
  Divider,
  Box,
  Grid,
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

export function Test() {
  const [testInProgress, setTestInProgress] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const { data, error, loading } = useGetNextWordQuery(1, cursor);

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
            onClick={() => {
              setTestInProgress(true);
            }}
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
            onClick={() => {
              setTestInProgress(true);
              setIsTestFinished(false);
              setCursor(null);
            }}
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
            style={{ padding: "8px" }}
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
            <Button
              onClick={() => setIsRevealed(!isRevealed)}
              color="primary"
              style={{ fontWeight: "bold" }}
            >
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
                    fontWeight: "bold",
                    margin: "8px",
                  }}
                  onClick={() => {
                    setIsRevealed(false);
                    if (hasNextPage) {
                      setCursor(currentWordCursor);
                    } else {
                      setIsTestFinished(true);
                      setTestInProgress(false);
                    }
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#b30000",
                    color: "white",
                    fontWeight: "bold",
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
