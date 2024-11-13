beforeAll(() => {
  // Make sessionStorage configurable
  Object.defineProperty(global, 'sessionStorage', {
    value: {
      getItem: jest.fn().mockReturnValue('mockedItem'), // Mocks the return value of getItem
      setItem: jest.fn(), // Mocks setItem with no-op
      removeItem: jest.fn(), // Mocks removeItem with no-op
      clear: jest.fn(), // Mocks clear with no-op
    },
    writable: true, // Allow modification of sessionStorage in tests
  });
});
