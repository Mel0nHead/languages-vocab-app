import React from "react";
import { render } from "@testing-library/react";

// TODO: finish off these tests
describe("Component: TestContent", () => {
  it("should render the correct text, and answer initially should not be revealed", () => {
    const component = render(<TestContent />);
  });
  it("should reveal answer when 'reveal answer' button is clicked", () => {});
  it("should fire callback when 'yes' or 'no' button is clicked", () => {});
});
