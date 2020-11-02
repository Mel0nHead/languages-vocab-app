import React from "react";
import { StartTest } from "./StartTest";
import { render, fireEvent } from "@testing-library/react";

describe("Component: StartTest", () => {
  it("should render properly", () => {
    const callback = jest.fn();
    const component = render(<StartTest startNewTest={callback} />);

    expect(component.getByTestId("start-test-text").textContent).toBe(
      "Welcome to the test page. To start a test, click the button below."
    );
    fireEvent.click(component.getByTestId("start-test-button"));
    expect(callback).toHaveBeenCalled();
  });
});
