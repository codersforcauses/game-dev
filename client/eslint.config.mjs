// import { FlatCompat } from '@eslint/eslintrc'
//
// const compat = new FlatCompat({
//   baseDirectory: import.meta.dirname,
// });
//
// const eslintConfig =[
//   ...compat.config({
//     extends: ["next/core-web-vitals", "next/typescript"]
//   }),
//   {
//     files: ["**/*.ts", "**/*.tsx"],
//     plugins: {
//       'simple-import-sort': simpleImportSort,
//       import: importPlugin,
//     },
//     languageOptions: {
//       parser: tsParser,
//     },
//     rules: {
//       "simple-import-sort/imports": "warn",
//       "simple-import-sort/exports": "warn",
//       "import/first": "warn",
//       "import/newline-after-import": "warn",
//       "import/no-duplicates": "warn",
//     },
//   },
//   {
//     ignores: ["node_modules/**", ".next/**", "next-env.d.ts"]
//   }
// ];
//
// export default eslintConfig

// import importPlugin from "eslint-plugin-import";
import tsParser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "node_modules/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      // import: importPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "import/first": "warn",
      "import/newline-after-import": "warn",
      "import/no-duplicates": "warn",
    },
  },
]);

export default eslintConfig;
