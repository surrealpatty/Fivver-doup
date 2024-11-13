module.exports = {
  // Set up file transformations
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest for JS/JSX files
  },

  // Specify the file types Jest should process
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'], // Allow JSON imports if needed

  // Handle module name mapping (e.g., resolve `@` to `src`)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Maps @ to src for Jest
  },

  // Set the root directory for test files (if they are in the `src` folder)
  roots: ['<rootDir>/src'], // Ensure Jest looks inside the src folder for tests

  // Choose the appropriate test environment
  testEnvironment: 'node', // Use 'node' for backend testing, or 'jsdom' for frontend testing

  // Path to Jest setup file(s)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Set up mocks or any initializations for Jest

  // Collect coverage from relevant files
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'], // Collect coverage for source files

  // Ignore transforming files in node_modules unless explicitly configured
  transformIgnorePatterns: ['/node_modules/'],

  // Jest globals configuration for TypeScript and Babel
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json', // Reference your tsconfig.json for TypeScript
    },
    'babel-jest': {
      isolatedModules: true, // Optimize performance for Babel
    },
  },

  // Optionally, if you need to support static file imports (like images, styles)
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS/SCSS imports if needed
  },

  // Optionally, specify coverage thresholds (e.g., 80% coverage required)
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
};
