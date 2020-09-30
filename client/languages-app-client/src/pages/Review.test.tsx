import "@testing-library/jest-dom/extend-expect";
import { Review } from "./Review";
import { getAllWordsGql } from "../graphql/useGetAllWordsQuery";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { deleteWordGql } from "../graphql/useDeleteWordMutation";
import { render, wait } from "@testing-library/react";
import React from "react";
import { getAllWords } from "../generated-graphql-interfaces";

const wordsData: getAllWords = {
  getWords: {
    __typename: "WordConnection",
    pageInfo: {
      __typename: "PageInfo",
      hasNextPage: false,
      hasPreviousPage: false,
    },
    totalCount: 3,
    edges: [
      {
        __typename: "WordEdge",
        cursor: "ldkjfd",
        node: {
          __typename: "Word",
          language: "en-es",
          originalWord: "dog",
          translatedWord: "perro",
          id: "1",
        },
      },
      {
        __typename: "WordEdge",
        cursor: "ldkjfd",
        node: {
          __typename: "Word",
          language: "en-es",
          originalWord: "dog",
          translatedWord: "perro",
          id: "2",
        },
      },
      {
        __typename: "WordEdge",
        cursor: "ldkjfd",
        node: {
          __typename: "Word",
          language: "en-es",
          originalWord: "dog",
          translatedWord: "perro",
          id: "3",
        },
      },
    ],
  },
};

async function setUpTest(error: Error | undefined) {
  const mocks: MockedResponse[] = [
    {
      request: {
        query: getAllWordsGql,
        variables: {},
      },
      result: {
        data: wordsData,
      },
      error,
    },
    {
      request: {
        query: deleteWordGql,
        variables: {
          id: 1,
        },
      },
      result: {
        data: {},
      },
    },
  ];

  const component = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Review />
    </MockedProvider>
  );
  // assert that loading message is rendered initially
  expect(component.queryByTestId("loading-message")).toBeInTheDocument();
  await wait();
  const loading = component.queryByTestId("loading-message");
  const errorMsg = component.queryByTestId("error-message");
  const reviewContainer = component.queryByTestId("review-container");

  return {
    loading,
    errorMsg,
    reviewContainer,
    component,
  };
}

describe("Component: Review", () => {
  it("should display data", async () => {
    const { component, errorMsg, reviewContainer, loading } = await setUpTest(
      undefined
    );
    expect(loading).not.toBeInTheDocument();
    expect(errorMsg).not.toBeInTheDocument();
    expect(reviewContainer).toBeInTheDocument();
    expect(component.getAllByTestId("translate-card")).toHaveLength(3);
  });

  it("should show error message when it exists", async () => {
    const { errorMsg, reviewContainer, loading } = await setUpTest(
      new Error("Something went wrong")
    );
    expect(loading).not.toBeInTheDocument();
    expect(errorMsg).toBeInTheDocument();
    expect(reviewContainer).not.toBeInTheDocument();
  });
});
