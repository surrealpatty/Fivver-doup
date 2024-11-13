// jest.setup.js

// Mocking sessionStorage
const mockStorage = require('mock-local-storage');

// Mock only the methods you need (don't redefine sessionStorage itself)
global.sessionStorage = mockStorage;

// If you're using localStorage as well, you can do the same
global.localStorage = mockStorage;

// If using any other global storage objects (e.g., cookies), mock them similarly
