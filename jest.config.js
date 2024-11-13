module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "ts", "json", "vue", "node"],
  transform: {
    "^.+\\.vue$": "vue-jest",      // Use vue-jest for Vue files
    "^.+\\.ts$": "ts-jest",        // Use ts-jest for TypeScript files
    "^.+\\.jsx?$": "babel-jest",   // Use babel-jest for JS files
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
    "!src/main.ts",               // Exclude main entry files if necessary
    "!src/router/**",             // Exclude router files
    "!src/store/**",              // Exclude Vuex store files
    "!src/**/*.d.ts",             // Exclude TypeScript declaration files
  ],
  coverageDirectory: "<rootDir>/coverage",  // Specify coverage directory
  coverageReporters: ["text", "lcov", "json"],  // Add different coverage reporters
};
