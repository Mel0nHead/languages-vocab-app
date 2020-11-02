import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TestContent } from "./TestContent";
import "@testing-library/jest-dom/extend-expect";
import { getWords } from "../../../generated-graphql-interfaces";

function setUpTest() {
  const nextQuestionMock = jest.fn();
  const scoreChangeMock = jest.fn();
  const data: getWords = {
    getWords: {
      __typename: "WordConnection",
      totalCount: 10,
      edges: [
        {
          __typename: "WordEdge",
          node: {
            __typename: "Word",
            id: "1",
            originalWord: "dog",
            translatedWord: "perro",
            dateLastSeen: "Fri May 08 2020 09:05:42 GMT+0100",
            dateAdded: "Fri May 08 2020 09:05:42 GMT+0100",
            language: "en-es",
          },
          cursor: "MQ==",
        },
      ],
      pageInfo: {
        __typename: "PageInfo",
        hasPreviousPage: false,
        hasNextPage: true,
      },
    },
  };
  const component = render(
    <TestContent
      handleGetNextQuestion={nextQuestionMock}
      handleScoreChange={scoreChangeMock}
      cursor="MQ=="
      data={data}
    />
  );
  const translatedWord = component.getByTestId("test-translated-word");
  const revealButton = component.getByTestId("reveal-answer-button");
  const answerContainer = component.queryByTestId("test-answer-container");
  const testTitle = component.getByTestId("test-title").textContent;
  const originalLanguage = component.getByTestId("test-original-language")
    .textContent;
  const originalWord = component.getByTestId("test-original-word").textContent;
  const translatedLanguage = component.getByTestId("test-translated-language")
    .textContent;

  return {
    component,
    scoreChangeMock,
    nextQuestionMock,
    translatedWord,
    revealButton,
    answerContainer,
    testTitle,
    originalWord,
    originalLanguage,
    translatedLanguage,
  };
}

describe("Component: TestContent", () => {
  it("should render the correct text, and answer initially should not be revealed", () => {
    const {
      component,
      testTitle,
      originalLanguage,
      originalWord,
      translatedLanguage,
    } = setUpTest();

    expect(testTitle).toBe("What is the translation of the word below?");
    expect(originalLanguage).toBe("English:");
    expect(originalWord).toBe("dog");
    expect(translatedLanguage).toBe("Spanish:");
    expect(component.getByTestId("test-translated-word").textContent).toBe(
      "???"
    );
    expect(
      component.queryByTestId("test-answer-container")
    ).not.toBeInTheDocument();
  });

  it("should reveal answer when 'reveal answer' button is clicked", () => {
    const { translatedWord, revealButton, component } = setUpTest();

    fireEvent.click(revealButton);
    expect(translatedWord.textContent).toBe("perro");
    expect(
      component.queryByTestId("test-answer-container")
    ).toBeInTheDocument();
  });

  it("should fire callback when 'yes' or 'no' button is clicked", () => {
    const {
      component,
      revealButton,
      scoreChangeMock,
      nextQuestionMock,
    } = setUpTest();
    fireEvent.click(revealButton);
    fireEvent.click(component.getByTestId("yes-button"));
    expect(scoreChangeMock).toHaveBeenCalledWith("correct");
    expect(nextQuestionMock).toHaveBeenCalledWith(true, "MQ==");
    expect(
      component.queryByTestId("test-answer-container")
    ).not.toBeInTheDocument();
  });
});
