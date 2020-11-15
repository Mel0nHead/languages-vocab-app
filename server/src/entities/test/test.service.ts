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
    const correctAnswers = isAnswerCorrect ? 
    if (isAnswerCorrect) {
        test.correctAnswers++;
      } else {
        test.incorrectAnswers++;
      }
  }
}
