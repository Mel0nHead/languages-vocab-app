import { Service } from "typedi";
import { Test } from "./test.entity";

@Service()
export class TestService {
  public updateTimestamps(test: Test, isCompleted?: boolean) {
    const now = new Date();
    const finishedAt = isCompleted ? now : test.finishedAt;
    return { ...test, updatedAt: now, finishedAt };
  }

  public updateAnswers(test: Test, isAnswerCorrect: boolean) {
    const correctAnswers = isAnswerCorrect
      ? test.correctAnswers + 1
      : test.correctAnswers;
    const incorrectAnswers = !isAnswerCorrect
      ? test.incorrectAnswers + 1
      : test.incorrectAnswers;
    return { ...test, correctAnswers, incorrectAnswers };
  }
}
