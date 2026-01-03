export type LocaleType = "en" | "tr";

export const Locale = {
  en: "en",
  tr: "tr",
} as const;
export const locales = Object.values(Locale);

export const baseLocale = Locale.en;
