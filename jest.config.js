module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "ts", "json", "vue", "node"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.ts$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  verbose: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
    "vue-jest": {
      tsConfig: "<rootDir>/tsconfig.json",
    },
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@vue|vue3|@vue/test-utils)/)",
  ],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,ts,vue}", "!src/main.ts", "!src/router/**", "!src/store/**"],
};
