// Remove the redundant import of Service
// const Service = require('../dist/src/models/services'); // This is incorrect and redundant
// const Service = require('../src/models/services'); // This is also incorrect and redundant

// Define the math function you're testing
const math = (a, b) => a * b; // This is the function being tested

describe('Math Functions', () => {
    test('multiplies 2 by 3 to equal 6', () => {
        expect(math(2, 3)).toBe(6);
    });
    test('multiplies -1 by 1 to equal -1', () => {
        expect(math(-1, 1)).toBe(-1);
    });
    test('multiplies 0 by 5 to equal 0', () => {
        expect(math(0, 5)).toBe(0);
    });
});
