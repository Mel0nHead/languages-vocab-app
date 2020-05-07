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

  const totalWords = data?.getAllWords?.totalCount;

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

  if (loading) return <b>Loading</b>;

  if (error) return <b>Error: {error.message}</b>;

  if (!data) return <b>No data</b>;

  return (
    <div>
      <h1>Test</h1>
      <div>
        {!testStatus.progress && !testStatus.finished && (
          <StartTest startNewTest={handleStartNewTest} />
        )}
        {!testStatus.progress && testStatus.finished && (
          <FinishedTest
            startAnotherTest={handleStartAnotherTest}
            correctAnswers={score.correct}
            totalWords={totalWords}
          />
        )}
        {testStatus.progress && (
          <>
            {/* TODO: extract into separate component */}
            <span>
              {wordCount}/{totalWords}
            </span>
            <LinearProgress
              variant="determinate"
              value={normalise(wordCount, totalWords)}
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
