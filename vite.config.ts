import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    // TanStack Start must come first
    tanstackStart(),
    // Nitro with Bun preset
    nitro({
      preset: "bun",
    }),
    // Path aliases
    tsConfigPaths(),
    // React plugin
    viteReact(),
    // Tailwind CSS
    tailwindcss(),
    // Paraglide i18n
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      strategy: ["cookie", "baseLocale"],
      cookieName: "paraglide-locale",
    }),
  ],
});
