module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Use ts-jest for TypeScript files
    '^.+\\.jsx?$': 'babel-jest',  // Use babel-jest for JS files
    '^.+\\.vue$': 'vue-jest',  // If you're using Vue, keep this
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Maps @ to src for Jest
  },
  roots: ['<rootDir>/dist', '<rootDir>/src'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx,vue}'],
  transformIgnorePatterns: ['/node_modules/'],
  globals: {
    'babel-jest': {
      isolatedModules: true,
    },
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',  // Reference your tsconfig.json here
    },
  },
};
