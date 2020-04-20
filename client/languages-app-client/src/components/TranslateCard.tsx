import React from "react";
import { Word } from "../pages/Home";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Paper } from "@material-ui/core";
import ReactCountryFlag from "react-country-flag";
import { getLanguageInfoFromLanguageCode } from "../constants";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "20px",
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
  word: Word;
  buttonLabel: string;
  onClick: () => void;
}

export function TranslateCard(props: TranslateCardProps) {
  const { word, onClick } = props;
  const langsArr = word.language.split("-");
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={3}>
      <CardContent>
        <Box mb={2}>
          <Typography color="textSecondary" gutterBottom>
            Original word
          </Typography>
          <Typography variant="h5" component="h2">
            {word.originalWord}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography color="textSecondary" gutterBottom>
            Translation
          </Typography>
          <Typography variant="h5" component="h2">
            {word.translatedWord}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography color="textSecondary" gutterBottom>
            Languages
          </Typography>
          <Typography variant="h5" component="h2">
            {langsArr.map((langStr, index) => {
              const languageInfo = getLanguageInfoFromLanguageCode(langStr);
              return (
                <span key={index} title={languageInfo?.language || "English"}>
                  <ReactCountryFlag
                    style={{
                      fontSize: "2rem",
                      marginRight: "5px",
                      borderRadius: "3px",
                    }}
                    countryCode={languageInfo?.countryCode || "GB"}
                    svg
                  />
                </span>
              );
            })}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button onClick={onClick}>{props.buttonLabel}</Button>
      </CardActions>
    </Paper>
  );
}
