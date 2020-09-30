import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import "@testing-library/jest-dom/extend-expect";
import { Test } from "./Test";
import { getNextWordGql } from "../graphql/useGetNextWordQuery";

const getAllWords = {
  getWords: {
    totalCount: 1,
    edges: [
      {
        node: {
          id: 1,
          originalWord: "dog",
          translatedWord: "perro",
          dateLastSeen: new Date(),
          dateAdded: new Date(),
          box: 1,
          language: "en-es",
        },
        cursor: "MQ==",
      },
    ],
    pageInfo: {
      hasPreviousPage: false,
      hasNextPage: false,
    },
  },
};

const noWordsData = {
  getWords: {
    totalCount: 0,
    edges: [],
    pageInfo: {
      hasPreviousPage: false,
      hasNextPage: false,
    },
  },
};

async function setUpTest(data: any, error: Error | undefined) {
  const mocks: MockedResponse[] = [
    {
      request: {
        query: getNextWordGql,
        variables: {
          first: 1,
          after: null,
        },
      },
      result: {
        data,
      },
      error,
    },
  ];

  const component = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Test />
    </MockedProvider>
  );
  // check loading state
  expect(component.queryByTestId("loading-message")).toBeInTheDocument();
  await wait();

  const loadingMsg = component.queryByTestId("loading-message");
  const errorMsg = component.queryByTestId("error-message");
  const noDataMsg = component.queryByTestId("no-data-message");
  const testContainer = component.queryByTestId("test-container");

  return {
    component,
    loadingMsg,
    errorMsg,
    noDataMsg,
    testContainer,
  };
}

describe("Component: Test", () => {
  it("should render properly", async () => {
    const { loadingMsg, errorMsg, noDataMsg, testContainer } = await setUpTest(
      getAllWords,
      undefined
    );
    expect(loadingMsg).not.toBeInTheDocument();
    expect(errorMsg).not.toBeInTheDocument();
    expect(noDataMsg).not.toBeInTheDocument();
    expect(testContainer).toBeInTheDocument();
  });

  it("should show error state", async () => {
    const { loadingMsg, errorMsg, noDataMsg, testContainer } = await setUpTest(
      getAllWords,
      new Error("Error")
    );
    expect(loadingMsg).not.toBeInTheDocument();
    expect(errorMsg).toBeInTheDocument();
    expect(noDataMsg).not.toBeInTheDocument();
    expect(testContainer).not.toBeInTheDocument();
  });

  it("should show no data message", async () => {
    const { loadingMsg, errorMsg, noDataMsg, testContainer } = await setUpTest(
      {},
      undefined
    );
    expect(loadingMsg).not.toBeInTheDocument();
    expect(errorMsg).not.toBeInTheDocument();
    expect(noDataMsg).toBeInTheDocument();
    expect(testContainer).not.toBeInTheDocument();
  });

  it("should show 'start' view, 'in progress' view and 'finished' view", async () => {
    const { component } = await setUpTest(getAllWords, undefined);
    expect(component.queryByTestId("start-test-container")).toBeInTheDocument();
    fireEvent.click(component.getByTestId("start-test-button")); // start the test

    expect(
      component.getByTestId("in-progress-test-container")
    ).toBeInTheDocument();
    expect(component.getByTestId("test-progress-bar")).toBeInTheDocument();
    expect(component.getByTestId("test-counter").textContent).toBe("0/1");

    fireEvent.click(component.getByTestId("reveal-answer-button"));
    fireEvent.click(component.getByTestId("yes-button")); // answer the only test question

    expect(
      component.getByTestId("finished-test-container")
    ).toBeInTheDocument();
  });

  it("should display message when there are no words to review", async () => {
    const {
      loadingMsg,
      errorMsg,
      noDataMsg,
      testContainer,
      component,
    } = await setUpTest(noWordsData, undefined);

    expect(loadingMsg).not.toBeInTheDocument();
    expect(errorMsg).not.toBeInTheDocument();
    expect(noDataMsg).not.toBeInTheDocument();
    expect(testContainer).not.toBeInTheDocument();
    expect(component.getByTestId("no-words-message")).toBeInTheDocument();
  });
});
