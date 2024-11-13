module.exports = {
  // Set up file transformations
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest for JS/JSX files
  },

  // Specify the file types Jest should process
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'], // Allow JSON and other potential extensions

  // Handle module name mapping (e.g., resolve `@` to `src`)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Maps @ to src for Jest
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS/SCSS imports if needed
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
  transformIgnorePatterns: ['/node_modules/(?!your-package-name)'], // Transform specific node_modules files if needed

  // Jest globals configuration for TypeScript and Babel
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json', // Reference your tsconfig.json for TypeScript
    },
    'babel-jest': {
      isolatedModules: true, // Optimize performance for Babel
    },
  },

  // Optional: Increase Jest worker timeout if you're hitting worker process issues
  testTimeout: 30000, // 30 seconds timeout (you can adjust as needed)

  // Optionally, specify coverage thresholds (e.g., 80% coverage required)
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Optionally specify the maximum number of workers Jest can use in parallel
  maxWorkers: 2, // Reduce parallelism if you're running into resource constraints
};
