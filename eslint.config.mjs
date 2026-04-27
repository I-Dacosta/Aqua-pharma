import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Ignore other projects in this monorepo directory
    "aqua-pharma/**",
    "aquatiq/**",
    "codrops-depth-gallery/**",
    "hima/**",
    "intranet/**",
    "lightship/**",
    "stingrey/**",
    "trio/**",
  ]),
]);

export default eslintConfig;
