beforeAll(() => {
  // Make sessionStorage configurable
  Object.defineProperty(global, 'sessionStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });

  // Optionally, you can provide mock implementations for these methods
  global.sessionStorage.getItem.mockImplementation(() => 'mockedItem');
  global.sessionStorage.setItem.mockImplementation(() => {});
  global.sessionStorage.removeItem.mockImplementation(() => {});
  global.sessionStorage.clear.mockImplementation(() => {});
});
