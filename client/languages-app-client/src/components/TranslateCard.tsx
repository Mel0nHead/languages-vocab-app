import React from "react";
import { Word } from "../pages/Home";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
  handleAdd: (word: Word) => void;
}

export function TranslateCard(props: TranslateCardProps) {
  const { word, handleAdd } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ margin: "20px" }}>
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
            {word.language}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleAdd(word)}>Add to my words</Button>
      </CardActions>
    </Card>
  );
}
