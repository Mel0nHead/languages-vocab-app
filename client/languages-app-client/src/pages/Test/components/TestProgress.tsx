import { LinearProgress } from "@material-ui/core";
import React from "react";
import { normalise } from "../../../common/utils/normalise";

interface TestProgressProps {
  wordCount: number;
  totalWordsCount: number;
}

export function TestProgress(props: TestProgressProps) {
  const { wordCount, totalWordsCount } = props;

  return (
    <>
      <span data-testid="test-counter">
        {wordCount}/{totalWordsCount}
      </span>
      <LinearProgress
        variant="determinate"
        value={normalise(wordCount, totalWordsCount)}
        data-testid="test-progress-bar"
      />
    </>
  );
}
