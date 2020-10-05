import { render } from "@testing-library/react";
import React from "react";
import { useFetch } from "../hooks/useFetch";
import { ChooseLanguages } from "./ChooseLanguages";

jest.mock("../hooks/useFetch", () => ({
  useFetch: jest.fn(),
}));

function setUpTest() {
  const component = render(
    <ChooseLanguages
      handleLanguageChange={jest.fn()}
      currentLanguage={{ destination: "en", source: "fi" }}
    />
  );

  return { component };
}

describe("Component: ChooseLanguages", () => {
  it("should render error", () => {
    // @ts-ignore
    useFetch.mockImplementation(() => ({
      data: "i am data",
      loading: false,
      error: {
        name: "Error",
        message: "I am error",
      },
    }));
    const { component } = setUpTest();

    expect(
      component.queryByTestId("choose-languages-error")
    ).toBeInTheDocument();
  });

  it("should render loading", () => {
    // @ts-ignore
    useFetch.mockImplementation(() => ({
      data: "i am data",
      loading: true,
      error: null,
    }));

    const { component } = setUpTest();

    expect(
      component.queryByTestId("choose-languages-loading")
    ).toBeInTheDocument();
  });

  it("should render no data message", () => {
    // @ts-ignore
    useFetch.mockImplementation(() => ({
      data: null,
      loading: false,
      error: null,
    }));

    const { component } = setUpTest();

    expect(
      component.queryByTestId("choose-languages-no-data")
    ).toBeInTheDocument();
  });

  it("should render selects", () => {
    // @ts-ignore
    useFetch.mockImplementation(() => ({
      data: {
        dirs: ["en", "es", "fi"],
        langs: {
          en: "English",
          es: "Spanish",
          fi: "Finnish",
        },
      },
      loading: false,
      error: null,
    }));

    const { component } = setUpTest();

    expect(component.queryByTestId("choose-languages")).toBeInTheDocument();
  });
});
