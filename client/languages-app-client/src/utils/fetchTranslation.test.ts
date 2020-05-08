import fetchMock from "jest-fetch-mock";
import { YANDEX_URL, YANDEX_KEY } from "../constants";
import { fetchTranslation } from "./fetchTranslation";

describe("Function: fetchTranslation", () => {
  it("should fetch from the correct endpoint", () => {
    const lang = "en-es";
    const text = "dog";
    fetchMock.mockResponseOnce(JSON.stringify({ data: "12345" }));

    fetchTranslation(lang, text).then((res) => {
      expect(res.data).toBe("12345");
      expect(fetchMock.mock.calls.length).toBe(1);
      expect(fetchMock.mock.calls[0][0]).toBe(
        `${YANDEX_URL}/translate?key=${YANDEX_KEY}&lang=${lang}&text=${text}`
      );
    });
  });
});
