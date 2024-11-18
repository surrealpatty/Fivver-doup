module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      project: './tsconfig.json',
      tsconfigRootDir: __dirname
    },
    plugins: ['@typescript-eslint', 'vue'],
    extends: [
      'airbnb-typescript/base',
      'plugin:import/typescript',
      'plugin:vue/vue3-recommended',
      'plugin:@typescript-eslint/recommended'
    ],
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.ts',
            '**/jest.config.ts'
          ]
        }
      ],
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': 'warn'
    },
    overrides: [
      {
        files: ['**/*.test.ts', '**/*.test.js'],
        env: {
          jest: true
        },
        globals: {
          jest: 'readonly',
          describe: 'readonly',
          it: 'readonly',
          expect: 'readonly',
          beforeAll: 'readonly',
          afterAll: 'readonly',
          beforeEach: 'readonly',
          afterEach: 'readonly'
        }
      }
    ]
  };
  