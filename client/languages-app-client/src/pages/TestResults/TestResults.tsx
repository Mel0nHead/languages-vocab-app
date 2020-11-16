import { Box, Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { getTests_getTests } from "../../generated-graphql-interfaces";
import { useGetTestsQuery } from "./graphql/useGetTestsQuery";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(2),
  },
  paperTitle: {
    fontSize: "1.2rem",
    fontWeight: 500,
  },
  paperHeader: {
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  span: {
    color: theme.palette.grey[600],
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
            <Box className={classes.paperHeader}>
              <Typography className={classes.paperTitle}>
                Score: {getFinalScoreAsPercentage(test)}%
              </Typography>
            </Box>
            <Divider />
            <Box p={2}>
              <Typography>
                <span className={classes.span}>Test ID:</span> {test.id}
              </Typography>
              <Typography>
                <span className={classes.span}>Completed at:</span>{" "}
                {test.finishedAt}
              </Typography>
              <Typography>
                <span className={classes.span}>Correct answers:</span>{" "}
                {test.correctAnswers}
              </Typography>
              <Typography>
                <span className={classes.span}>Incorrect answers:</span>{" "}
                {test.incorrectAnswers}
              </Typography>
            </Box>
          </Paper>
        );
      })}
    </>
  );
}
