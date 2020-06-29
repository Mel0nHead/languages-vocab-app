import React from "react";
import { Box, Typography, Button } from "@material-ui/core";

interface FinishedTestProps {
  startAnotherTest: () => void;
  correctAnswers: number;
  totalWords: number;
}

export function FinishedTest(props: FinishedTestProps) {
  return (
    <Box data-testid="finished-test-container">
      <Typography data-testid="score-text">
        Score: {props.correctAnswers}/{props.totalWords}
      </Typography>
      <Typography data-testid="game-over-text">
        You have finished the test! Click the button below to start a new test.
      </Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          data-testid="start-test-button"
          onClick={props.startAnotherTest}
        >
          Start Test
        </Button>
      </Box>
    </Box>
  );
}
