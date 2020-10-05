import { render } from "@testing-library/react";
import React from "react";
import { TestProgress } from "./TestProgress";

describe("Component: TestProgress", () => {
  it("should render counter and progress bar", () => {
    const component = render(
      <TestProgress wordCount={1} totalWordsCount={5} />
    );

    expect(component.getByTestId("test-counter")).toHaveTextContent("1/5");
    expect(
      component.getByRole("progressbar").getAttribute("aria-valuenow")
    ).toBe("20");
  });
});
