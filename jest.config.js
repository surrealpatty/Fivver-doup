module.exports = {
  transform: {
    '^.+\\.tsx?$': 'babel-jest',       // Transforms TypeScript files with Babel
    '^.+\\.jsx?$': 'babel-jest',       // Transforms JavaScript files with Babel
    '^.+\\.vue$': 'vue-jest'           // Processes Vue files with vue-jest
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',   // Maps @ to src directory
  },
  roots: ['<rootDir>/src'],           // Specifies Jest root folder
  testEnvironment: 'jsdom',           // jsdom environment for Vue component testing
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // Optional setup file
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx,vue}',   // Collect coverage from source files
  ],
  transformIgnorePatterns: [
    '/node_modules/',                 // Ignores node_modules
  ],
};
