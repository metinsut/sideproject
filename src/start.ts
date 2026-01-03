import { createStart } from "@tanstack/react-start";
import { i18nRequestMiddleware } from "./middleware/i18n";

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [i18nRequestMiddleware],
  };
});
