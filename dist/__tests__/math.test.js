// dist/__tests__/math.test.js
const math = require('./math.js'); // Ensure that math.js is in the correct location (dist/__tests__)

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
