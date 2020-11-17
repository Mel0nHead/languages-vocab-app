import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Paper, Grid } from "@material-ui/core";
import { getLanguageInfo } from "../utils/getLanguageInfo";
import { FlagIcon } from "./FlagIcon";
import { getAllWords_getWords_edges_node } from "../../generated-graphql-interfaces";

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 275,
    marginBottom: "20px",
    padding: theme.spacing(2),
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

interface TranslateCardProps {
  word:
    | getAllWords_getWords_edges_node
    | Omit<getAllWords_getWords_edges_node, "__typename">;
  buttonLabel: string;
  onClick: () => void;
}

export function TranslateCard(props: TranslateCardProps) {
  const { word, onClick } = props;
  const langugageCodes = word.language.split("-"); // e.g 'en-ru' -> ['en', 'ru']
  const classes = useStyles();

  function mapLanguageCodeToFlag(languageCode: string) {
    const languageInfo = getLanguageInfo(languageCode);
    return <FlagIcon languageInfo={languageInfo} />;
  }

  return (
    <Paper className={classes.paper} elevation={3} data-testid="translate-card">
      <Grid container alignItems="center">
        <Grid item xs={5}>
          <Typography color="textSecondary" gutterBottom>
            Original word: {mapLanguageCodeToFlag(langugageCodes[0])}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            data-testid="original-word-text"
          >
            {word.originalWord}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography color="textSecondary" gutterBottom>
            Translation: {mapLanguageCodeToFlag(langugageCodes[1])}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            data-testid="translated-word-text"
          >
            {word.translatedWord}
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.buttonWrapper}>
          <Button
            disableElevation
            onClick={onClick}
            color="secondary"
            variant="contained"
            data-testid="translate-card-button"
          >
            {props.buttonLabel}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
