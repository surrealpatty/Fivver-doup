// eslint.config.mjs

export default {
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      parser: '@typescript-eslint/parser', // Optional if you're using TypeScript
      rules: {
        // Your specific rules for .ts and .vue files
      },
    },
  ],
  // Additional ESLint configurations can go here
};
