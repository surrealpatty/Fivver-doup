// src/__tests__/example.test.js

describe('Example Test Suite', () => {
  // This will run before each test in the suite
  beforeEach(() => {
    // Setup code can go here if needed
  });

  // Test case to check if true is true
  test('should return true', () => {
    expect(true).toBe(true);
  });

  // Test case to check negation
  test('should return false when negated', () => {
    expect(!true).toBe(false);
  });

  // Test case to verify simple addition
  test('should perform a simple addition', () => {
    expect(1 + 1).toBe(2);
  });

  // Test case to check the type of the result
  test('should check the type of the result', () => {
    expect(typeof (1 + 1)).toBe('number');
  });
});
