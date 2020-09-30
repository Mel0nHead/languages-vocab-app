import React from "react";
import { Home } from "./Home";
import { render, wait, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import "@testing-library/jest-dom/extend-expect";

const mockAddMutation = jest.fn();

jest.mock("../utils/fetchTranslation.ts", () => ({
  fetchTranslation: () => {
    return { text: ["perro"] };
  },
}));

jest.mock("../graphql/useAddWordMutation.ts", () => ({
  useAddWordMutation: () => {
    return [mockAddMutation];
  },
}));

function setUpTest() {
  const component = render(
    <MockedProvider>
      <Home />
    </MockedProvider>
  );
  const translateBtn = component.getByTestId("translate-btn");
  const translateInput = component.getByTestId("translate-input");
  const translateCards = component.queryAllByTestId("translate-card");

  return {
    component,
    translateBtn,
    translateInput,
    translateCards,
  };
}

describe("Component: Home", () => {
  it("should render properly", async () => {
    const {
      component,
      translateBtn,
      translateInput,
      translateCards,
    } = setUpTest();

    expect(translateBtn.textContent).toBe("Translate");
    expect(translateInput).toBeInTheDocument();
    expect(component.getAllByTestId("select")).toHaveLength(2);
    expect(translateCards).toHaveLength(0);
  });

  it("translating word should lead to a translate card being generated", async () => {
    const { component, translateBtn, translateInput } = setUpTest();

    fireEvent.input(translateInput.querySelector("input")!, {
      target: { value: "dog" },
    });
    fireEvent.click(translateBtn);
    await wait();

    expect(component.queryAllByTestId("translate-card")).toHaveLength(1);
    expect(component.getByTestId("original-word-text").textContent).toBe("dog");
    expect(component.getByTestId("translated-word-text").textContent).toBe(
      "perro"
    );
    const addWordBtn = component.getByTestId("translate-card-button");
    fireEvent.click(addWordBtn);
    await wait();

    expect(mockAddMutation).toHaveBeenCalled();
    expect(mockAddMutation.mock.calls[0][0].variables).toMatchObject({
      language: "en-es",
      originalWord: "dog",
      translatedWord: "perro",
    });
    expect(component.queryAllByTestId("translate-card")).toHaveLength(0);
  });
});
