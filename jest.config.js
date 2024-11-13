module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",  // For simulating browser environment
  moduleFileExtensions: ["js", "ts", "json", "vue", "node"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",  // Use vue3-jest for Vue files
    "^.+\\.ts$": "ts-jest",          // Transform TypeScript files with ts-jest
    "^.+\\.jsx?$": "babel-jest",     // Transform JS files with babel-jest
  },
  verbose: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",  // Path alias for components
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",  // Ensure TypeScript support
    },
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@vue|vue3|@vue/test-utils)/)",  // Allow transformation of Vue-related packages
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts,vue}",
    "!src/main.ts",
    "!src/router/**",
    "!src/store/**",
    "!src/**/*.d.ts",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov", "json"],
};
