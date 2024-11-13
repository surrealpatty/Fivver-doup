module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",  // For Vue single-file components
    "^.+\\.ts$": "ts-jest",          // For TypeScript files
    "^.+\\.jsx?$": "babel-jest"      // For JavaScript/JSX files
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"   // Alias for importing files
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
    "vue-jest": {
      tsConfig: "<rootDir>/tsconfig.json",
      experimentalCSSCompile: true,  // Optional for CSS in Vue files
    },
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@vue|vue3|@vue/test-utils)/)"
  ],
  verbose: true,
};
