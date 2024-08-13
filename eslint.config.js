module.exports = [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    ignores: ["node_modules/**", "dist/**"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      "prettier": require("eslint-plugin-prettier"),
    },
    rules: {
      "prettier/prettier": "error",
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    },
  },
];
