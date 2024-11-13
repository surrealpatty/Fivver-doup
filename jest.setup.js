beforeAll(() => {
  // Mock sessionStorage to simulate browser's sessionStorage in tests
  Object.defineProperty(global, 'sessionStorage', {
    value: {
      getItem: jest.fn().mockReturnValue('mockedItem'),  // Mocks the return value of getItem
      setItem: jest.fn(),  // Mocks setItem with no-op
      removeItem: jest.fn(),  // Mocks removeItem with no-op
      clear: jest.fn(),  // Mocks clear with no-op
    },
    writable: true,  // Allows overwriting global sessionStorage
  });
});

afterEach(() => {
  // Clear the mocks to ensure no leakage between tests
  jest.clearAllMocks();
});

