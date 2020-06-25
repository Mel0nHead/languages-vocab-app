import "@testing-library/jest-dom/extend-expect";
import { Review } from "./Review";
import { getWordsToReviewGql } from "../graphql/useGetWordsToReviewQuery";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { deleteWordGql } from "../graphql/useDeleteWordMutation";
import { render, wait } from "@testing-library/react";
import React from "react";

describe("Component: Review", () => {
  it("should display data", async () => {
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
        error: undefined,
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
    await wait();
    expect(component.queryByTestId("loading-message")).not.toBeInTheDocument();
    expect(component.queryByTestId("error-message")).not.toBeInTheDocument();
    expect(component.queryByTestId("review-container")).toBeInTheDocument();
  });

  it("should show error message when it exists", async () => {
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
        error: new Error("dfhdlk"),
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
      <MockedProvider mocks={mocks}>
        <Review />
      </MockedProvider>
    );
    await wait();
    expect(component.queryByTestId("error-message")).toBeInTheDocument();
    expect(component.queryByTestId("review-container")).not.toBeInTheDocument();
  });

  it("should render loading state", async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: getWordsToReviewGql,
          variables: {
            boxes: [1],
          },
        },
        result: {
          data: {},
        },
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
      <MockedProvider mocks={[]}>
        <Review />
      </MockedProvider>
    );
    await wait();
    // expect(component.queryByTestId("loading-message")).toBeInTheDocument();
    expect(component.queryByTestId("error-message")).not.toBeInTheDocument();
    expect(component.queryByTestId("review-container")).not.toBeInTheDocument();
  });
});
