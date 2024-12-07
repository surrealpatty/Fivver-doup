// src/test/sample.test.ts
// Example sum function defined directly in the test file
function sum(a, b) {
    return a + b;
}
// Jest Test Suite for the sum function
describe('Sum Function Tests', function () {
    // Optional setup before all tests
    beforeAll(function () {
        console.log('Setting up before this test suite...');
        // Any global setup logic can go here
    });
    // Test cases
    test('adds 1 + 2 to equal 3', function () {
        expect(sum(1, 2)).toBe(3);
    });
    test('adds -1 + 1 to equal 0', function () {
        expect(sum(-1, 1)).toBe(0);
    });
    test('adds 0 + 0 to equal 0', function () {
        expect(sum(0, 0)).toBe(0);
    });
    // Additional test case
    test('adds 100 + 200 to equal 300', function () {
        expect(sum(100, 200)).toBe(300);
    });
    test('adds -50 + 50 to equal 0', function () {
        expect(sum(-50, 50)).toBe(0);
    });
    // Optional cleanup after all tests
    afterAll(function () {
        console.log('Cleaning up after this test suite...');
        // Any cleanup logic can go here if needed
    });
});
