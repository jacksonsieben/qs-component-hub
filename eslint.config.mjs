import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: globals.browser }, files:["*.js" ], rules: { "no-unused-vars": "warn","no-console": "off" }},
  pluginJs.configs.recommended,
];