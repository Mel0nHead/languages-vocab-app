import { render } from "@testing-library/react";
import React from "react";
import { ChooseLanguages } from "./ChooseLanguages";

const err: Error = {
  name: "Error",
  message: "I am error",
};

jest.mock("../hooks/useFetch", () => ({
  useFetch: () => {
    return {
      data: "i am data",
      loading: false,
      error: {
        name: "Error",
        message: "I am error",
      },
    };
  },
}));

describe("Component: ChooseLanguages", () => {
  it.only("should render error", () => {
    const component = render(
      <ChooseLanguages
        handleLanguageChange={jest.fn()}
        currentLanguage={{ destination: "en", source: "fi" }}
      />
    );

    // expect(
    //   component.queryByTestId("choose-languages-error")
    // ).toBeInTheDocument();
  });

  it("should render loading", () => {});
  it("should render no data message", () => {});
  it("should render selects", () => {});
});
