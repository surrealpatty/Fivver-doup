// jest.setup.js

// Mocking sessionStorage without redefining it directly
const mockStorage = require('mock-local-storage');

// Instead of trying to assign to global.sessionStorage, mock it using Object.defineProperty
Object.defineProperty(global, 'sessionStorage', {
  value: mockStorage,
  writable: true,  // Ensure that it can be modified during tests
  configurable: true,  // Allow reconfiguration if needed during tests
});

// Similarly, mock localStorage if needed
Object.defineProperty(global, 'localStorage', {
  value: mockStorage,
  writable: true,
  configurable: true,
});

// You can also mock other globals like cookies or indexedDB if required in your tests

// Mock Sequelize setup
jest.mock('sequelize', () => {
  const SequelizeMock = jest.fn().mockImplementation(() => ({
    sync: jest.fn().mockResolvedValue(true),
    authenticate: jest.fn().mockResolvedValue(true),
    close: jest.fn().mockResolvedValue(true),
    define: jest.fn().mockReturnThis(),
    model: {
      findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Test' }), // Mocked data
      create: jest.fn().mockResolvedValue({ id: 1, name: 'Test' }), // Mocked data
    },
  }));

  return {
    Sequelize: SequelizeMock,
  };
});
