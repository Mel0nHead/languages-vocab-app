import React, { useState } from "react";
import { StartTest } from "../components/StartTest";
import { FinishedTest } from "../components/FinishedTest";
import { TestContent } from "../components/TestContent";

/**
 * TODO:
 * - add a progress bar
 */

export function Test() {
  const [testInProgress, setTestInProgress] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);

  function handleStartAnotherTest() {
    setTestInProgress(true);
    setIsTestFinished(false);
    setCursor(null);
  }

  function handleStartNewTest() {
    setTestInProgress(true);
  }

  function handleGetNextQuestion(hasNextPage: boolean, cursor: string) {
    if (hasNextPage) {
      setCursor(cursor);
    } else {
      setIsTestFinished(true);
      setTestInProgress(false);
    }
  }

  return (
    <div>
      <h1>Test</h1>
      <div>
        {!testInProgress && !isTestFinished && (
          <StartTest startNewTest={handleStartNewTest} />
        )}
        {!testInProgress && isTestFinished && (
          <FinishedTest startAnotherTest={handleStartAnotherTest} />
        )}
        {testInProgress && (
          <TestContent
            cursor={cursor}
            handleGetNextQuestion={handleGetNextQuestion}
          />
        )}
      </div>
    </div>
  );
}
