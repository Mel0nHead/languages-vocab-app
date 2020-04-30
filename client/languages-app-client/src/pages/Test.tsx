import React, { useState } from "react";
import { Typography, Button, Paper } from "@material-ui/core";
import { useGetNextWordQuery } from "../graphql/useGetNextWordQuery";

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

    return (
      <Paper>
        <div>
          <Typography>What is the translation of the word below?</Typography>
        </div>
        <div>
          <div>
            <div>{currentWord.originalWord}</div>
            <div>{currentWord.language}</div>
            {isRevealed && <div>{currentWord.translatedWord}</div>}
          </div>
          <div>
            <Button onClick={() => setIsRevealed(!isRevealed)}>
              Reveal answer
            </Button>
          </div>
        </div>
        {isRevealed && (
          <div>
            <Typography>Did you get the answer right?</Typography>
            <div>
              <Button
                variant="contained"
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
              <Button variant="contained">No</Button>
            </div>
          </div>
        )}
      </Paper>
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
