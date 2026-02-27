import dictionary from "./dictionary.json";

export const LANG = {
  ENGLISH: "en",
  JAPANESE: "ja",
} as const;
export const LANGS = Object.values(LANG);
export const DEFAULT_LANG = LANG.JAPANESE;
export type Lang = (typeof LANGS)[number];

export function getDictionary(lang: Lang) {
  return dictionary[lang];
}
