{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "sourceType": "module"
  },
  "extends": [
    "airbnb-typescript/base",
    "plugin:import/typescript"
  ],
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "**/*.test.ts",
          "**/jest.config.ts"
        ]
      }
    ]
  }
}
