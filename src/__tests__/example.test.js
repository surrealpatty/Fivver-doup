// src/__tests__/example.test.js

describe('Example Test Suite', () => {
  // This will run before each test in the suite
  beforeEach(() => {
      // Setup code can go here if needed
  });

  test('should return true', () => {
      expect(true).toBe(true);
  });

  test('should return false when negated', () => {
      expect(!true).toBe(false);
  });

  test('should perform a simple addition', () => {
      expect(1 + 1).toBe(2);
  });
});
