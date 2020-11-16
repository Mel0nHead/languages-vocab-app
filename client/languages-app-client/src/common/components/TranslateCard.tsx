import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Paper, Divider } from "@material-ui/core";
import { getLanguageInfo } from "../utils/getLanguageInfo";
import { FlagIcon } from "./FlagIcon";
import { getAllWords_getWords_edges_node } from "../../generated-graphql-interfaces";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: "20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface TranslateCardProps {
  word:
    | getAllWords_getWords_edges_node
    | Omit<getAllWords_getWords_edges_node, "__typename">;
  buttonLabel: string;
  onClick: () => void;
}

export function TranslateCard(props: TranslateCardProps) {
  const { word, onClick } = props;
  const langsArr = word.language.split("-");
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={3} data-testid="translate-card">
      <CardContent>
        <Box mb={2}>
          <Typography color="textSecondary" gutterBottom>
            Original word
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            data-testid="original-word-text"
          >
            {word.originalWord}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography color="textSecondary" gutterBottom>
            Translation
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            data-testid="translated-word-text"
          >
            {word.translatedWord}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography color="textSecondary" gutterBottom>
            Languages
          </Typography>
          <Typography variant="h5" component="h2" data-testid="icon-container">
            {langsArr.map((langStr, index) => {
              const languageInfo = getLanguageInfo(langStr);
              return <FlagIcon languageInfo={languageInfo} key={index} />;
            })}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          disableElevation
          onClick={onClick}
          color="secondary"
          variant="contained"
          style={{ fontWeight: "bold" }}
          data-testid="translate-card-button"
        >
          {props.buttonLabel}
        </Button>
      </CardActions>
    </Paper>
  );
}
