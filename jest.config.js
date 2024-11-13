module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",  // Using jsdom for simulating the browser environment
  moduleFileExtensions: ["js", "ts", "json", "vue", "node"],  // Support Vue, TS, and JS files
  transform: {
    "^.+\\.vue$": "vue-jest",   // Transform Vue files using vue-jest
    "^.+\\.ts$": "ts-jest",     // Transform TS files using ts-jest
    "^.+\\.jsx?$": "babel-jest", // Transform JS files using babel-jest
  },
  verbose: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",  // Path alias for Vue components
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",  // Ensure TypeScript support with ts-jest
    },
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@vue|vue3|@vue/test-utils)/)",  // Allow transformation of Vue-related packages
  ],
  collectCoverage: true,  // Enable code coverage collection
  collectCoverageFrom: [
    "src/**/*.{js,ts,vue}",  // Collect coverage for JS, TS, and Vue files
    "!src/main.ts",           // Exclude main entry file
    "!src/router/**",         // Exclude router files
    "!src/store/**",          // Exclude Vuex store files
    "!src/**/*.d.ts",         // Exclude TypeScript declaration files
  ],
  coverageDirectory: "<rootDir>/coverage",  // Output directory for code coverage
  coverageReporters: ["text", "lcov", "json"],  // Coverage reporters
};

