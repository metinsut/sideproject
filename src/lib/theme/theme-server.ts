import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { z } from "zod";

const UserThemeSchema = z.enum(["light", "dark", "system"]).catch("system");
export type Theme = z.infer<typeof UserThemeSchema>;

const storageKey = "ui-theme";

export const getThemeServerFn = createServerFn().handler(async () => {
  return (getCookie(storageKey) || "light") as Theme;
});

export const setThemeServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data !== "string" || (data !== "dark" && data !== "light" && data !== "system")) {
      throw new Error("Invalid theme provided");
    }
    return data as Theme;
  })
  .handler(async ({ data }) => {
    setCookie(storageKey, data);
  });
