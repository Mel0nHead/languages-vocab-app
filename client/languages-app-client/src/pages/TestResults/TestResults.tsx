import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { getTests_getTests } from "../../generated-graphql-interfaces";
import { useGetTestsQuery } from "./graphql/useGetTestsQuery";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  paperTitle: {
    fontSize: "1.2rem",
    fontWeight: 500,
  },
}));

export function TestResults() {
  const classes = useStyles();
  const { data, error, loading } = useGetTestsQuery(
    localStorage.getItem("userId") || ""
  );

  function getFinalScoreAsPercentage(test: getTests_getTests) {
    return Math.round(
      (test.correctAnswers / (test.correctAnswers + test.incorrectAnswers)) *
        100
    );
  }

  return (
    <>
      <h1>Test Results</h1>
      {loading && <b>loading...</b>}
      {error && <b>{error.message}</b>}
      {data?.getTests.map((test) => {
        return (
          <Paper
            key={test.id}
            elevation={0}
            variant="outlined"
            className={classes.paper}
          >
            <Typography variant="h2" className={classes.paperTitle}>
              Test ID: {test.id}
            </Typography>
            <Typography>Completed at: {test.finishedAt}</Typography>
            <Typography>Correct answers: {test.correctAnswers}</Typography>
            <Typography>Incorrect answers: {test.incorrectAnswers}</Typography>
            <Typography>
              Total score: {getFinalScoreAsPercentage(test)}%
            </Typography>
          </Paper>
        );
      })}
    </>
  );
}
