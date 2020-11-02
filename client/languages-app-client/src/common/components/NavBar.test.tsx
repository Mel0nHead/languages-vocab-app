import React from "react";
import { render } from "@testing-library/react";
import { NavBar } from "./NavBar";
import { BrowserRouter } from "react-router-dom";

describe("Component: NavBar", () => {
  it("should render the links", () => {
    const component = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const navLinks = component.getAllByTestId("nav-link");

    expect(navLinks).toHaveLength(3);
    expect(navLinks[0].textContent).toBe("Home");
    expect(navLinks[0].getAttribute("href")).toBe("/home");
    expect(navLinks[1].textContent).toBe("Review");
    expect(navLinks[1].getAttribute("href")).toBe("/review");
    expect(navLinks[2].textContent).toBe("Test");
    expect(navLinks[2].getAttribute("href")).toBe("/test");
  });
});
