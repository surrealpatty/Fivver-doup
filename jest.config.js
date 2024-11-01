{
  "name": "fivver_doup",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "test": "jest"
  },
  "dependencies": {
    "vue": "^3.5.12"
  },
  "devDependencies": {
    "@vue/compiler-sfc": "^3.5.12",
    "@babel/core": "^7.x.x", // Adjust to your Babel version
    "babel-jest": "^26.x.x", // Ensure compatibility with your Babel version
    "vue-jest": "^3.0.7",
    "jest": "^27.x.x" // Use the version compatible with vue-jest
  },
  "jest": {
    "testEnvironment": "jsdom",
    "transform": {
      "^.+\\.vue$": "vue-jest",
      "^.+\\.jsx?$": "babel-jest"
    },
    "moduleFileExtensions": ["js", "vue", "json"],
    "testMatch": [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    "collectCoverage": true,
    "coverageDirectory": "coverage",
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "<rootDir>/src/main.js"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    },
    "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"]
  }
}
