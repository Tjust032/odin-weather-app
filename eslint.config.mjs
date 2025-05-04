import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  globalIgnores([
    // Ignore webpack configs
    'webpack.*.js',
    'webpack.config.js',
  ]),
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic,
      prettier: prettierPlugin,
    },
    rules: {
      // Run Prettier as an ESLint rule
      'prettier/prettier': 'error',

      // Stylistic rules (add more if needed)
      '@stylistic/max-len': [
        'warn',
        {
          code: 80,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      '@stylistic/spaced-comment': ['warn', 'always'],
      '@stylistic/no-mixed-operators': 'warn',

      // JavaScript best practices
      'prefer-const': 'warn',
      'no-var': 'error',
      'no-object-constructor': 'error',
      'object-shorthand': 'warn',
      'prefer-object-spread': 'warn',
      'no-array-constructor': 'error',
      'prefer-destructuring': 'warn',
      'quotes': ['warn', 'single'],
      'prefer-template': 'warn',
      'no-eval': 'error',
      'no-new-func': 'error',
      'no-useless-escape': 'warn',
      'func-names': ['error', 'as-needed'],
      'no-loop-func': 'error',
      'prefer-rest-params': 'error',
      'camelcase': 'error',
      'default-param-last': 'error',
      'prefer-spread': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-useless-constructor': 'error',
      'class-methods-use-this': 'error',
      'no-duplicate-imports': 'error',
      'dot-notation': 'warn',
      'prefer-exponentiation-operator': 'warn',
      'no-undef': 'error',
      'one-var': ['error', 'never'],
      'no-multi-assign': 'error',
      'no-plusplus': 'error',
      'no-use-before-define': 'error',
      'eqeqeq': 'error',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'no-else-return': ['warn', { allowElseIf: false }],
      'no-new-wrappers': 'error',
      'radix': 'error',
      'id-length': ['error', { exceptions: ['e', 'a', 'b', 'i', 'j'] }],
      'new-cap': 'error',
      'no-underscore-dangle': 'warn',
      'no-restricted-globals': [
        'error',
        {
          name: 'isFinite',
          message:
            'Use Number.isFinite instead: https://github.com/airbnb/javascript#standard-library--isfinite',
        },
        {
          name: 'isNaN',
          message:
            'Use Number.isNaN instead: https://github.com/airbnb/javascript#standard-library--isnan',
        },
      ],
    },
  },
]);
