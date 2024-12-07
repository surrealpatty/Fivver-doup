"use strict";
function sum(a, b) {
    return a + b;
}
describe('Sum Function Tests', () => {
    beforeAll(() => {
        console.log('Setting up before this test suite...');
    });
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
    test('adds -1 + 1 to equal 0', () => {
        expect(sum(-1, 1)).toBe(0);
    });
    test('adds 0 + 0 to equal 0', () => {
        expect(sum(0, 0)).toBe(0);
    });
    test('adds 100 + 200 to equal 300', () => {
        expect(sum(100, 200)).toBe(300);
    });
    test('adds -50 + 50 to equal 0', () => {
        expect(sum(-50, 50)).toBe(0);
    });
    afterAll(() => {
        console.log('Cleaning up after this test suite...');
    });
});
