import React from "react";
import { LanguageSelect } from "./LanguageSelect";
import { render, fireEvent, wait } from "@testing-library/react";

describe("Component: LanguageSelect", () => {
  it("should render label, initial value and have the list of available options", async () => {
    const callback = jest.fn();
    const availableLangs = {
      af: "Afrikaans",
      de: "German",
      ja: "Japanese",
    };
    const component = render(
      <LanguageSelect
        label="Label"
        value="af"
        handleChange={callback}
        availableLanguages={availableLangs}
      />
    );
    expect(component.getByTestId("select-label").textContent).toBe("Label");
    expect(
      component.getByTestId("select").querySelectorAll("option")
    ).toHaveLength(3);
  });
});
