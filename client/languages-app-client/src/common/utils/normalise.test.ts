import { normalise } from "./normalise";

describe("Function: normalise", () => {
  it("should always return number between 0 and 100", () => {
    expect(normalise(2, 5)).toBe(40);
    expect(normalise(17, 39)).toBeCloseTo(43.6, 1);
  });
});
