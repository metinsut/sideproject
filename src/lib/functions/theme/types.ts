export const themeCookieName = "ui-theme";
export enum ThemeEnum {
  dark = "dark",
  light = "light",
}

export type ThemeTypes = keyof typeof ThemeEnum;
