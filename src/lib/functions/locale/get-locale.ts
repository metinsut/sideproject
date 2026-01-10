import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import type { LocaleType } from "./types";
import { Locale } from "./types";

export const LOCALE_COOKIE_NAME = "paraglide-locale";

export const getLocaleServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const locale = getCookie(LOCALE_COOKIE_NAME) ?? Locale.en;
  return locale as LocaleType;
});
