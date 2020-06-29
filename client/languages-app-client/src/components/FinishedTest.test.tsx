import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { FinishedTest } from "./FinishedTest";

describe("Component: FinishedTest", () => {
  it("should fire the start another test callback when button is clicked", () => {
    const callback = jest.fn();
    const component = render(
      <FinishedTest
        correctAnswers={3}
        totalWords={10}
        startAnotherTest={callback}
      />
    );
    const startTestBtn = component.getByTestId("start-test-button");
    fireEvent.click(startTestBtn);

    expect(component.getByTestId("score-text").textContent).toBe("Score: 3/10");
    expect(component.getByTestId("game-over-text").textContent).toBe(
      "You have finished the test! Click the button below to start a new test."
    );
    expect(callback).toHaveBeenCalled();
  });
});
