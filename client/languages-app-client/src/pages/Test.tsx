import React, { useState } from "react";
import { Typography, Button, Paper } from "@material-ui/core";

export function Test() {
  const [testInProgress, setTestInProgress] = useState(false);

  function getNotInProgressMessage() {
    return (
      <div>
        <Typography>
          Welcome to the test page. To start a test, click the button below.
        </Typography>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setTestInProgress(true);
            }}
          >
            Start Test
          </Button>
        </div>
      </div>
    );
  }

  function getTestContent() {
    return (
      <Paper>
        <div>
          <Typography>What is the translation of the word below?</Typography>
        </div>
        <div>
          <div>Word info</div>
          <div>
            <Button>Reveal answer</Button>
          </div>
        </div>
        <div>
          <div>
            <Typography>Did you get the answer right?</Typography>
          </div>
          <div>
            <Button variant="contained">Yes</Button>
            <Button variant="contained">No</Button>
          </div>
        </div>
      </Paper>
    );
  }

  return (
    <div>
      <h1>Test</h1>
      <div>
        {!testInProgress && getNotInProgressMessage()}
        {testInProgress && getTestContent()}
      </div>
    </div>
  );
}
