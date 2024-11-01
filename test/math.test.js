// math.test.ts
import multiply from './math'; // Use ES module syntax if using TypeScript

describe('Math Functions', () => {
    test('multiplies 2 by 3 to equal 6', () => {
        expect(multiply(2, 3)).toBe(6);
    });

    test('multiplies -1 by 1 to equal -1', () => {
        expect(multiply(-1, 1)).toBe(-1);
    });

    test('multiplies 0 by 5 to equal 0', () => {
        expect(multiply(0, 5)).toBe(0);
    });
});

