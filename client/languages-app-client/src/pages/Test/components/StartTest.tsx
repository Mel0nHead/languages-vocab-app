import React from "react";
import { Typography, Box, Button } from "@material-ui/core";

interface StartTestProps {
  startNewTest: () => void;
}

export function StartTest(props: StartTestProps) {
  return (
    <Box data-testid="start-test-container">
      <Typography data-testid="start-test-text">
        Welcome to the test page. To start a test, click the button below.
      </Typography>
      <Box mt={2}>
        <Button
          disableElevation
          variant="contained"
          color="secondary"
          onClick={props.startNewTest}
          data-testid="start-test-button"
        >
          Start Test
        </Button>
      </Box>
    </Box>
  );
}
