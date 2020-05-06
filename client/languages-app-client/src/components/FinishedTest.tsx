import React from "react";
import { Box, Typography, Button } from "@material-ui/core";

interface FinishedTestProps {
  startAnotherTest: () => void;
  correctAnswers: number;
  totalWords: number;
}

export function FinishedTest(props: FinishedTestProps) {
  return (
    <Box>
      <Typography>
        Score: {props.correctAnswers}/{props.totalWords}
      </Typography>
      <Typography>
        You have finished the test! Click the button below to start a new test.
      </Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={props.startAnotherTest}
        >
          Start Test
        </Button>
      </Box>
    </Box>
  );
}
