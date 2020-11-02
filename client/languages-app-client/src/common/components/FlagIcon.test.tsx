import React from "react";
import { FlagIcon } from "./FlagIcon";
import { LanguageInfo } from "../constants";
import { render } from "@testing-library/react";

function setUpTest(languageInfo: LanguageInfo | undefined = undefined) {
  const component = render(<FlagIcon languageInfo={languageInfo} />);
  const iconContainer = component.getByTestId("flag-icon-container");
  const title = iconContainer.getAttribute("title");
  const imgSrc = iconContainer.querySelector("img")?.getAttribute("src"); // could be a bit fragile as API changes could change the src

  return { title, imgSrc };
}

describe("Component: FlagIcon", () => {
  it("should have title and image according to language info passed in", () => {
    const languageInfo: LanguageInfo = {
      language: "Danish",
      languageCode: "da",
      countryCode: "DK",
    };
    const { title, imgSrc } = setUpTest(languageInfo);

    expect(title).toBe("Danish");
    expect(imgSrc).toContain("dk.svg");
  });

  it("should have default title and image when language info is undefined", () => {
    const { title, imgSrc } = setUpTest();

    expect(title).toBe("English");
    expect(imgSrc).toContain("gb.svg");
  });
});
