import fetchMock from "jest-fetch-mock";
import { YANDEX_URL, YANDEX_KEY } from "../constants";
import { fetchTranslation } from "./fetchTranslation";

fetchMock.enableMocks();

const lang = "en-es";
const text = "dog";

describe("Function: fetchTranslation", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should fetch from the correct endpoint", async () => {
    fetchMock.mockOnce(JSON.stringify({ data: "12345" }));

    const res = await fetchTranslation(lang, text);
    expect(res.data).toBe("12345");
    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      `${YANDEX_URL}/translate?key=${YANDEX_KEY}&lang=${lang}&text=${text}`
    );
  });

  it("should return null when there is an error", async () => {
    fetchMock.mockReject(new Error("fake error message"));

    const res = await fetchTranslation(lang, text);
    expect(res).toBeNull();
  });
});
