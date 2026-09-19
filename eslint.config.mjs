import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // output: "export" без оптимизатора next/image: снимки пережаты заранее
      // в WebP и отдаются обычным <img srcSet> (DESIGN.md §8).
      "@next/next/no-img-element": "off",
      // <head> в корневом layout App Router нужен ради <noscript>-стилей.
      "@next/next/no-head-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Скрипты сбора данных (CDP, Maps, Instagram) — не часть сайта.
    "_data/**",
  ]),
]);

export default eslintConfig;
