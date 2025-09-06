import { useRouter } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { createContext, use } from "react";
import { z } from "zod";
import { setThemeServerFn } from "@/lib/theme/theme-server";

const themeSchema = z.enum(["light", "dark"]).catch("light");
export type Theme = z.infer<typeof themeSchema>;

type ThemeContextVal = { theme: Theme; setTheme: (val: Theme) => void };
type Props = PropsWithChildren<{ theme: Theme }>;

const ThemeContext = createContext<ThemeContextVal | null>(null);

export function ThemeProvider({ children, theme }: Props) {
  const router = useRouter();

  function setTheme(val: Theme) {
    setThemeServerFn({ data: val });
    router.invalidate();
  }

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const val = use(ThemeContext);
  if (!val) throw new Error("useTheme called outside of ThemeProvider!");
  return val;
}
