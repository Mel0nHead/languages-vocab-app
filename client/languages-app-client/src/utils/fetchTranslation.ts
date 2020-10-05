import { YANDEX_URL, YANDEX_KEY } from "../constants";

export async function fetchTranslation(
  language: string,
  textToTranslate: string
) {
  const url = `${YANDEX_URL}/translate?key=${YANDEX_KEY}&lang=${language}&text=${textToTranslate}`;

  try {
    const res = await fetch(url, { method: "POST" });
    return res.json();
  } catch (error) {
    return null;
  }
}
