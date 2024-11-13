module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transforms TypeScript files
    '^.+\\.jsx?$': 'babel-jest', // Transforms JavaScript files with Babel
    '.*\\.(vue)$': '@vue/vue3-jest' // Transforms Vue files for Jest
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy' // Mock CSS imports
  },
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx,vue}'],
  transformIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json'
    },
    'babel-jest': {
      isolatedModules: true
    }
  },
  testTimeout: 30000, // Adjust timeout if needed
  maxWorkers: 2, // Manage parallel tests to conserve resources
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
