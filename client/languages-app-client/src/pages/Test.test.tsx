import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import "@testing-library/jest-dom/extend-expect";
import { Test } from "./Test";
import { getNextWordGql } from "../graphql/useGetNextWordQuery";

const getAllWords = {
  getAllWords: {
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
      hasNextPage: true,
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
  // TODO: finish these tests
  it("should show start view if it is the beginning of a test", () => {});
  it("should show progress view if test is in progress", () => {});
  it("should show finish test view if test is finished", () => {});
});
