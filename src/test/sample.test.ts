// Example function to test
function sum(a: number, b: number): number {
    return a + b;
  }
  
  // Jest test for the sum function
  describe('Sum Function', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
  
    test('adds -1 + 1 to equal 0', () => {
        expect(sum(-1, 1)).toBe(0);
    });
  
    test('adds 0 + 0 to equal 0', () => {
        expect(sum(0, 0)).toBe(0);
    });
  
    // Additional test case
    test('adds 100 + 200 to equal 300', () => {
        expect(sum(100, 200)).toBe(300);
    });
  
    test('adds -50 + 50 to equal 0', () => {
        expect(sum(-50, 50)).toBe(0);
    });
  });
  
  // Export the sum function if needed in other files
  module.exports = sum;
  