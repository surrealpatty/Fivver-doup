module.exports = {
  root: true, // Ensures ESLint is scoped to this project
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
  parserOptions: {
    ecmaVersion: 2020, // Allows parsing of modern ECMAScript features
    sourceType: 'module', // Allows usage of ES Modules
    project: './tsconfig.json', // Path to TypeScript config
    tsconfigRootDir: __dirname, // Ensures the tsconfig path is resolved correctly
  },
  plugins: ['@typescript-eslint', 'vue'], // Load plugins for TypeScript and Vue
  extends: [
    'airbnb-typescript/base', // Base configuration from Airbnb for TypeScript
    'plugin:import/typescript', // Support TypeScript imports
    'plugin:vue/vue3-recommended', // Recommended settings for Vue 3
    'plugin:@typescript-eslint/recommended', // TypeScript-specific linting rules
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts', // Allow test files to import dev dependencies
          '**/*.test.js',
          '**/jest.config.ts',
        ],
      },
    ],
    'vue/multi-word-component-names': 'off', // Allow single-word Vue component names
    '@typescript-eslint/no-unused-vars': 'warn', // Warn instead of error for unused variables
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.js'], // Override settings for test files
      env: {
        jest: true, // Enable Jest environment
      },
      globals: {
        jest: 'readonly', // Avoid "undefined" errors for Jest globals
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
  ],
};
