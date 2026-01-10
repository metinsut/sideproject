/** @type {import("@inlang/core/config").DefineConfig} */

import { baseLocale, locales } from "./src/lib/functions/locale/types";

export async function defineConfig(env) {
  const { default: pluginJson } = await env.$import(
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-json@3/dist/index.js",
  );

  const { default: paraglide } = await env.$import(
    "https://cdn.jsdelivr.net/npm/@inlang/paraglide-js@1/dist/index.js",
  );

  return {
    referenceLanguage: baseLocale,
    languages: locales,
    plugins: [
      pluginJson({
        pathPattern: ["./languages/root/{locale}.json", "./languages/project/{locale}.json"],
      }),
      paraglide({
        project: "./project.inlang",
        outdir: "./src/paraglide",
      }),
    ],
  };
}
