import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  text: {
    marginBottom: theme.spacing(2),
  },
}));

export function About() {
  const classes = useStyles();

  return (
    <>
      <h1>About</h1>
      <Typography className={classes.text}>
        Vocabify is an app that can help you learn new vocabulary for any
        foreign language!
      </Typography>
      <Typography className={classes.text}>
        First, start by <Link to="/home">translating some words</Link> from your
        native language to your desired language. Once you have translated a
        word, click 'Add to my words' to add it to your saved words.
      </Typography>
      <Typography className={classes.text}>
        To view your saved words, and to remove any words from your saved words,{" "}
        <Link to="/review">click here</Link>.
      </Typography>
      <Typography className={classes.text}>
        To test your knowledge of your saved words,{" "}
        <Link to="/test">visit the Test page</Link>. This will allow you to
        start a new test where you can check to see if you can remember the
        foreign translation for your saved words.
      </Typography>
      <Typography className={classes.text}>
        For a list of all your previous test results,{" "}
        <Link to="/test-results">visit the Test Results page</Link>. You will be
        able to see the time and date you completed each test, as well as the
        number of correct and incorrect answers.
      </Typography>
    </>
  );
}
