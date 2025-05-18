import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import reactX from 'eslint-plugin-react-x'
import reactPlugin from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'
import stylisticJsx from '@stylistic/eslint-plugin-jsx'


export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-x': reactX,
      'react': reactPlugin,
      '@stylistic': stylistic,
      '@stylistic/jsx': stylisticJsx
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactPlugin.configs.flat.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...reactX.configs['recommended-typescript'].rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-indent": ['error', 2],
      "indent": ["warn", 2],
      "semi": ["error"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/function-call-spacing": ["error", "never"],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/padding-line-between-statements": [
        "error",
        { "blankLine": "always", "prev": "function", "next": "function" },
        { "blankLine": "always", "prev": "*", "next": "export" }
      ],
      "@stylistic/keyword-spacing": "error",
      "@stylistic/newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }],
      "@stylistic/type-annotation-spacing": "error",
      "@stylistic/key-spacing": ["error", { "afterColon": true }],
      "@stylistic/comma-spacing": ["error", { "before": false, "after": true }],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/jsx/jsx-equals-spacing": [2, "never"],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/arrow-spacing": "error",
      "@typescript-eslint/no-unused-vars": "error",
    },
    settings: {
      "react": {
        "pragma": "React",  // Pragma to use, default to "React"
        "fragment": "Fragment",  // Fragment to use (may be a property of <pragma>), default to "Fragment"
        "version": "detect", // React version. "detect" automatically picks the version you have installed.
        // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
        // Defaults to the "defaultVersion" setting and warns if missing, and to "detect" in the future
        "defaultVersion": "18", // Default React version to use when the version you have installed cannot be detected.
      },
    }
  },
)
