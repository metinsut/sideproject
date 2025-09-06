import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import type { Theme } from "./theme-provider";

const storageKey = "ui-theme";

export const getThemeServerFn = createServerFn().handler(async () => {
  const cookieTheme = getCookie(storageKey) as Theme;
  return cookieTheme || "light";
});

export const setThemeServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data !== "string" || (data !== "dark" && data !== "light" && data !== "system")) {
      throw new Error("Invalid theme provided");
    }
    return data;
  })
  .handler(async ({ data }) => {
    setCookie(storageKey, data);
  });
