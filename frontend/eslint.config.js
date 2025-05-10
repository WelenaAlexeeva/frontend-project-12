import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    ignores: ['dist/**'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...globals.browser,
        React: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@stylistic': stylistic,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...js.configs.recommended.rules,

      // Основные правила
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z_]' }],

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'warn',

      // Стиль
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/function-paren-newline': ['error', 'consistent'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],

      // Другие правила
      'id-length': ['error', { min: 2, exceptions: ['_', 'i', 'j', 'x', 'y', 't'] }],
      'no-plusplus': 'error',
      'eqeqeq': ['error', 'always'],
      'camelcase': ['error', { properties: 'always' }],
    },
  },
]