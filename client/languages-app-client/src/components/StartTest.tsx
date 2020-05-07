import React from "react";
import { Typography, Box, Button } from "@material-ui/core";

interface StartTestProps {
  startNewTest: () => void;
}

export function StartTest(props: StartTestProps) {
  return (
    <Box>
      <Typography>
        Welcome to the test page. To start a test, click the button below.
      </Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={props.startNewTest}
        >
          Start Test
        </Button>
      </Box>
    </Box>
  );
}
