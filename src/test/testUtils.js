// src/__tests__/testUtils.js

// Example utility function that could be tested
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

describe('Test Utils', () => {
  test('capitalizeFirstLetter should capitalize the first letter of a string', () => {
      const result = capitalizeFirstLetter('hello');
      expect(result).toBe('Hello');
  });

  test('capitalizeFirstLetter should not change a string that already starts with an uppercase letter', () => {
      const result = capitalizeFirstLetter('Hello');
      expect(result).toBe('Hello');
  });

  test('capitalizeFirstLetter should return an empty string if input is empty', () => {
      const result = capitalizeFirstLetter('');
      expect(result).toBe('');
  });
});

// Add other tests for additional utility functions if needed
