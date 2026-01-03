import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import type { ThemeTypes } from "./types";
import { ThemeEnum, themeCookieName } from "./types";

export const getThemeServerFn = createServerFn().handler(async () => {
  const cookieTheme = getCookie(themeCookieName) ?? ThemeEnum.light;
  const theme = Object.values(ThemeEnum).includes(cookieTheme as ThemeEnum)
    ? cookieTheme
    : ThemeEnum.light;
  return theme as ThemeTypes;
});
