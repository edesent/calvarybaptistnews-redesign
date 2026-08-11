/**
 * eslint-config-next 16 ships flat configs directly, so they can be spread
 * without FlatCompat. Going through FlatCompat crashes the config validator
 * ("Converting circular structure to JSON") on this version.
 */
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "out/**"] },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
