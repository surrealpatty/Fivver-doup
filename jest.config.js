module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",  // Specify the DOM-like environment
  moduleFileExtensions: ["js", "ts", "json", "vue", "node"],  // Ensure .vue is included
  transform: {
    "^.+\\.vue$": "vue-jest",  // Use vue-jest for Vue files
    "^.+\\.ts$": "ts-jest",    // Transform TypeScript files with ts-jest
    "^.+\\.jsx?$": "babel-jest",  // Use babel-jest for JavaScript files
  },
  verbose: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",  // Resolve paths for Vue components
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",  // Ensure TypeScript support
    },
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@vue|vue3|@vue/test-utils)/)",  // Allow transformations for Vue-related modules
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts,vue}",
    "!src/main.ts",  // Exclude main entry files if necessary
    "!src/router/**",  // Exclude router files
    "!src/store/**",  // Exclude Vuex store files if you are using them
  ],
};
