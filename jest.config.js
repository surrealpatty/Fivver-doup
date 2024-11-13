module.exports = {
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",  // Ensure the setup file is loaded after environment setup
  ],
  testEnvironment: "jsdom",  // Use jsdom to simulate a browser environment
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "vue",
    "node",
  ],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",  // Transform .vue files using vue3-jest for Vue 3 compatibility
    "^.+\\.ts$": "ts-jest",          // Transform TypeScript files with ts-jest
    "^.+\\.jsx?$": "babel-jest",     // Transform JavaScript and JSX files with babel-jest
  },
  verbose: true,  // Enable verbose output for detailed results
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",  // Alias @ to the src directory
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",  // Specify tsconfig.json for ts-jest
    },
    "vue-jest": {
      tsConfig: "<rootDir>/tsconfig.json",  // Specify tsconfig.json for vue-jest
      experimentalCSSCompile: true,         // Enable experimental CSS compilation for Vue 3
    },
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@vue|vue3|@vue/test-utils)/)",  // Allow Vue-related packages in node_modules to be transformed
  ],
  collectCoverage: true,  // Enable coverage collection
  collectCoverageFrom: [
    "src/**/*.{js,ts,vue}",  // Collect coverage data from JS, TS, and Vue files in the src directory
    "!src/main.ts",          // Exclude main.ts (or any entry file that contains setup code)
    "!src/router/**",        // Exclude Vue Router files (if applicable)
    "!src/store/**",         // Exclude Vuex store files (if applicable)
  ],
  coverageReporters: ["html", "text-summary"],  // Output coverage in both HTML and text formats
};
