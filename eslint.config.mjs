import { ESLint } from 'eslint';
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin';
import eslintParserTypeScript from '@typescript-eslint/parser';

export default [
  {
    ignores: ['node_modules', 'dist'],
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypeScript,
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': ['error', {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }],
      "no-console":"warn",
      "no-unused-vars":"error",
      "prefer-const":"error",
      "no-undef":"error"
    },
    "globals": {
      "process" :"readonly"
    }
  }
];
