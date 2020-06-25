import "@testing-library/jest-dom/extend-expect";
import { Review } from "./Review";
import { getWordsToReviewGql } from "../graphql/useGetWordsToReviewQuery";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { deleteWordGql } from "../graphql/useDeleteWordMutation";
import { render, wait } from "@testing-library/react";
import React from "react";

const wordsData = {
  getWordsToReview: [
    {
      dateAdded: "Fri May 08 2020 09:05:42 GMT+0100",
      dateLastSeen: "Fri May 08 2020 09:05:42 GMT+0100",
      box: 1,
      language: "en-es",
      originalWord: "dog",
      translatedWord: "perro",
      id: 1,
    },
    {
      dateAdded: "Fri May 09 2020 09:05:42 GMT+0100",
      dateLastSeen: "Fri May 09 2020 09:05:42 GMT+0100",
      box: 1,
      language: "en-fi",
      originalWord: "frog",
      translatedWord: "sammakko",
      id: 2,
    },
    {
      dateAdded: "Fri May 10 2020 09:05:42 GMT+0100",
      dateLastSeen: "Fri May 10 2020 09:05:42 GMT+0100",
      box: 1,
      language: "en-fr",
      originalWord: "cat",
      translatedWord: "chat",
      id: 3,
    },
  ],
};

async function setUpTest(error: Error | undefined) {
  const mocks: MockedResponse[] = [
    {
      request: {
        query: getWordsToReviewGql,
        variables: {
          boxes: [1],
        },
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
