"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ThemeTypes } from "@/lib/theme/types";
import { ThemeEnum, themeCookieName } from "@/lib/theme/types";

const themeConfig: Record<ThemeTypes, { icon: string; label: string }> = {
  light: { icon: "☀️", label: "Light" },
  dark: { icon: "🌙", label: "Dark" },
};

export function ThemeToggle() {
  const theme = Cookies.get(themeCookieName) ?? ThemeEnum.light;
  const [cookieTheme, setCookieTheme] = useState<ThemeTypes>(theme as ThemeTypes);

  const handleThemeChange = (newTheme: string) => {
    Cookies.set(themeCookieName, newTheme);
    setCookieTheme(newTheme as ThemeTypes);

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(newTheme);
  };

  return (
    <Select value={cookieTheme} onValueChange={handleThemeChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={cookieTheme} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(themeConfig).map(([key, config]) => (
          <SelectItem key={key} value={key}>
            <div className="flex items-center gap-2">
              <span>{config.icon}</span>
              <span>{config.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
