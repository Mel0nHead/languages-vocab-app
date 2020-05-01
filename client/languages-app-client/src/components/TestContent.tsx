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
import { useGetNextWordQuery } from "../graphql/useGetNextWordQuery";
import { getLanguageInfo } from "../utils/getLanguageInfo";
import { FlagIcon } from "./FlagIcon";

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
  cursor: string | null;
}

export function TestContent(props: TestContentProps) {
  const classes = useStyles();
  const [isRevealed, setIsRevealed] = useState(false);
  const { data, error, loading } = useGetNextWordQuery(1, props.cursor);

  if (!data) {
    return <b>No data</b>;
  }

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
          <Grid item>
            <Typography>What is the translation of the word below?</Typography>
          </Grid>
          <Grid item>
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
          <Button onClick={() => setIsRevealed(true)} color="primary">
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
        >
          <div>
            <Typography>Did you get the answer right?</Typography>
            <Box mt={1}>
              <Button
                variant="contained"
                className={classes.successButton}
                onClick={() => {
                  setIsRevealed(false);
                  props.handleGetNextQuestion(hasNextPage, currentWordCursor);
                }}
              >
                Yes
              </Button>
              <Button variant="contained" className={classes.failureButton}>
                No
              </Button>
            </Box>
          </div>
        </Box>
      )}
    </>
  );
}
