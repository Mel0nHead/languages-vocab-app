import React, { useContext, useState } from "react";
import { StartTest } from "../components/StartTest";
import { FinishedTest } from "../components/FinishedTest";
import { TestContent } from "../components/TestContent";
import { useGetNextWordQuery } from "../graphql/useGetNextWordQuery";
import { TestProgress } from "../components/TestProgress";
import { AuthContext } from "../App";

export type AnswerType = "correct" | "incorrect";

export function Test() {
  const authContext = useContext(AuthContext);
  const [testStatus, setTestStatus] = useState({
    progress: false,
    finished: false,
  });
  const [cursor, setCursor] = useState<string | null>(null);
  const { data, error, loading } = useGetNextWordQuery(
    1,
    cursor,
    authContext.userId || ""
  );
  const [wordCount, setWordCount] = useState(0);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const totalWordsCount = data?.getWords?.totalCount;

  function handleStartTest() {
    setWordCount(0);
    setScore({ correct: 0, incorrect: 0 });
    setTestStatus({ progress: true, finished: false });
    setCursor(null);
  }

  function handleGetNextQuestion(hasNextPage: boolean, newCursor: string) {
    setWordCount((wordCount) => wordCount + 1);
    setCursor((currentCursor) => (hasNextPage ? newCursor : currentCursor));
    setTestStatus((currentStatus) =>
      !hasNextPage ? { progress: false, finished: true } : { ...currentStatus }
    );
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
          <StartTest startNewTest={handleStartTest} />
        )}
        {!testStatus.progress && testStatus.finished && (
          <FinishedTest
            startAnotherTest={handleStartTest}
            correctAnswers={score.correct}
            totalWords={totalWordsCount}
          />
        )}
        {testStatus.progress && (
          <>
            <TestProgress
              wordCount={wordCount}
              totalWordsCount={totalWordsCount}
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
