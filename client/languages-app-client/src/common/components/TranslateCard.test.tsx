import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TranslateCard } from "./TranslateCard";

describe("Component: TranslateCard", () => {
  it("should render properly", () => {
    const callback = jest.fn();
    const word = {
      language: "en-es",
      originalWord: "dog",
      translatedWord: "perro",
      id: 1,
    };
    const component = render(
      <TranslateCard
        buttonLabel="This is a button"
        onClick={callback}
        word={word}
      />
    );
    const button = component.getByTestId("translate-card-button");
    const icons = component
      .getByTestId("icon-container")
      .querySelectorAll("img");

    expect(component.getByTestId("original-word-text").textContent).toBe("dog");
    expect(component.getByTestId("translated-word-text").textContent).toBe(
      "perro"
    );
    expect(button.textContent).toBe("This is a button");
    expect(icons).toHaveLength(2);

    fireEvent.click(button);
    expect(callback).toHaveBeenCalled();
  });
});
