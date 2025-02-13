module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    /* typescript 相关的配置 */
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/ban-ts-comment": ["off"],
    "@typescript-eslint/no-unused-vars": ["off"],
    /* react 相关的配置 */
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    /* js 的基本配置 */
    semi: true,
    endOfLine: "auto",
  },
};
