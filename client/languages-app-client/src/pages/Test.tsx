import React, { useState } from "react";
import { StartTest } from "../components/StartTest";
import { FinishedTest } from "../components/FinishedTest";
import { TestContent } from "../components/TestContent";
import { useGetNextWordQuery } from "../graphql/useGetNextWordQuery";
import { LinearProgress } from "@material-ui/core";
import { normalise } from "../utils/normalise";

export type AnswerType = "correct" | "incorrect";

export function Test() {
  const [testStatus, setTestStatus] = useState({
    progress: false,
    finished: false,
  });
  const [cursor, setCursor] = useState<string | null>(null);
  const { data, error, loading } = useGetNextWordQuery(1, cursor);
  const [wordCount, setWordCount] = useState(0);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const totalWordsCount = data?.getAllWords?.totalCount;

  function handleStartAnotherTest() {
    setWordCount(0);
    setScore({ correct: 0, incorrect: 0 });
    setTestStatus({ progress: true, finished: false });
    setCursor(null);
  }

  function handleStartNewTest() {
    setWordCount(0);
    setScore({ correct: 0, incorrect: 0 });
    setTestStatus((status) => ({ ...status, progress: true }));
  }

  function handleGetNextQuestion(hasNextPage: boolean, cursor: string) {
    setWordCount((wordCount) => wordCount + 1);

    if (hasNextPage) {
      // TODO: change logic so that hook is not called conditionally!!
      setCursor(cursor);
    } else {
      setTestStatus({ progress: false, finished: true });
    }
  }

  function handleScoreChange(answer: AnswerType) {
    setScore((currentScore) => {
      return { ...currentScore, [answer]: currentScore[answer] + 1 };
    });
  }

  if (loading) return <b data-testid="loading-message">Loading</b>;

  if (error) return <b data-testid="error-message">Error: {error.message}</b>;

  if (!data) return <b data-testid="no-data-message">No data</b>;

  if (!totalWordsCount)
    return (
      <b data-testid="no-words-message">
        You have no words to test! Please add some words first on the Home page.
      </b>
    );

  return (
    <div data-testid="test-container">
      <h1>Test</h1>
      <div>
        {!testStatus.progress && !testStatus.finished && (
          <StartTest startNewTest={handleStartNewTest} />
        )}
        {!testStatus.progress && testStatus.finished && (
          <FinishedTest
            startAnotherTest={handleStartAnotherTest}
            correctAnswers={score.correct}
            totalWords={totalWordsCount}
          />
        )}
        {testStatus.progress && (
          <>
            {/* TODO: extract into separate component */}
            <span data-testid="test-counter">
              {wordCount}/{totalWordsCount}
            </span>
            <LinearProgress
              variant="determinate"
              value={normalise(wordCount, totalWordsCount)}
              data-testid="test-progress-bar"
            />
            <TestContent
              cursor={cursor}
              handleGetNextQuestion={handleGetNextQuestion}
              handleScoreChange={handleScoreChange}
              data={data}
            />
          </>
        )}
      </div>
    </div>
  );
}
