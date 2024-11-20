module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',  // Ensures import/export syntax works
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,  // Ensure correct relative path for tsconfig.json
  },
  plugins: ['@typescript-eslint', 'vue'],  // Vue plugin added
  extends: [
    'airbnb-typescript/base',
    'plugin:import/typescript',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',  // Ensure test files are excluded from prod dependencies
          '**/*.test.js',
          '**/jest.config.ts',
        ],
      },
    ],
    'vue/multi-word-component-names': 'off',  // You have already turned this off
    '@typescript-eslint/no-unused-vars': 'warn',  // Consider changing to 'error' if you prefer stricter enforcement
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.js', '**/*.vue'],
      env: {
        jest: true,  // Support for Jest globals in test files
      },
      globals: {
        jest: 'readonly',
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
