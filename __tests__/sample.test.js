// _test_/sample.test.js

// Example function to test
function sum(a, b) {
    return a + b;
  }
  
  // Jest test for the sum function
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  