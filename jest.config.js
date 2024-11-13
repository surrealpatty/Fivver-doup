module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Use ts-jest for TypeScript files
    '^.+\\.jsx?$': 'babel-jest',  // Use babel-jest for JS files
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Maps @ to src for Jest
  },
  roots: ['<rootDir>/dist', '<rootDir>/src'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],  // Removed .vue from here
  transformIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',  // Reference your tsconfig.json here
    },
    'babel-jest': {
      isolatedModules: true,
    },
  },
};
