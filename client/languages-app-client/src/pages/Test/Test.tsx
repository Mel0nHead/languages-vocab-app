import React, { useState } from "react";
import { StartTest } from "./components/StartTest";
import { FinishedTest } from "./components/FinishedTest";
import { TestContent } from "./components/TestContent";
import { useGetNextWordQuery } from "./graphql/useGetNextWordQuery";
import { TestProgress } from "./components/TestProgress";
import { useCreateTestMutation } from "./graphql/useCreateTestMutation";
import { useUpdateTestMutation } from "./graphql/useUpdateTestMutation";
import { Skeleton } from "@material-ui/lab";

export type AnswerType = "correct" | "incorrect";

export function Test() {
  const [testStatus, setTestStatus] = useState({
    progress: false,
    finished: false,
  });
  const [cursor, setCursor] = useState<string | null>(null);
  const { data, error, loading } = useGetNextWordQuery(
    1,
    cursor,
    localStorage.getItem("userId") || ""
  );
  const [testId, setTestId] = useState<string | null>(null);
  const [createTest] = useCreateTestMutation();
  const [updateTest] = useUpdateTestMutation();

  const [wordCount, setWordCount] = useState(0);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const totalWordsCount = data?.getWords?.totalCount;

  async function handleStartTest() {
    const { data } = await createTest({
      variables: { userId: localStorage.getItem("userId") || "" },
    });
    setTestId(data?.createTest.id || "");
    setWordCount(0);
    setScore({ correct: 0, incorrect: 0 });
    setTestStatus({ progress: true, finished: false });
    setCursor(null);
  }

  async function handleGetNextQuestion(
    hasNextPage: boolean,
    newCursor: string,
    answer: AnswerType
  ) {
    setWordCount((wordCount) => wordCount + 1);
    if (hasNextPage) {
      setCursor(newCursor);
    } else {
      setTestStatus({ progress: false, finished: true });
    }
    setScore((currentScore) => {
      return { ...currentScore, [answer]: currentScore[answer] + 1 };
    });
    const isAnswerCorrect = answer === "correct";
    await updateTest({
      variables: {
        testId: testId || "",
        isAnswerCorrect,
        completed: !hasNextPage,
      },
    });
  }

  return (
    <div data-testid="test-container">
      <h1>Test</h1>
      {!loading && !totalWordsCount && (
        <b data-testid="no-words-message">
          You have no words to test! Please add some words first on the Home
          page.
        </b>
      )}
      {!loading && !data && (
        <b>
          You have no words to test! Please add some words first on the Home
          page.
        </b>
      )}
      {loading && <Skeleton variant="rect" height="100%" />}
      {error && <b data-testid="error-message">An error occurred.</b>}
      <div>
        {!testStatus.progress && !testStatus.finished && (
          <StartTest startNewTest={handleStartTest} />
        )}
        {!testStatus.progress && testStatus.finished && (
          <FinishedTest
            startAnotherTest={handleStartTest}
            correctAnswers={score.correct}
            totalWords={totalWordsCount || 0}
          />
        )}
        {testStatus.progress && data && (
          <>
            <TestProgress
              wordCount={wordCount}
              totalWordsCount={totalWordsCount || 0}
            />
            <TestContent
              cursor={cursor}
              handleGetNextQuestion={handleGetNextQuestion}
              data={data}
            />
          </>
        )}
      </div>
    </div>
  );
}
