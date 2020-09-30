import { YANDEX_URL, YANDEX_KEY } from "../constants";

export async function fetchTranslation(
  language: string,
  textToTranslate: string
) {
  try {
    const res = await fetch(
      `${YANDEX_URL}/translate?key=${YANDEX_KEY}&lang=${language}&text=${textToTranslate}`,
      { method: "POST" }
    );
    return res.json();
  } catch (error) {
    return null;
  }
}
