"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// math.test.ts
const math_1 = __importDefault(require("./math")); // Use ES module syntax if using TypeScript
describe('Math Functions', () => {
    test('multiplies 2 by 3 to equal 6', () => {
        expect((0, math_1.default)(2, 3)).toBe(6);
    });
    test('multiplies -1 by 1 to equal -1', () => {
        expect((0, math_1.default)(-1, 1)).toBe(-1);
    });
    test('multiplies 0 by 5 to equal 0', () => {
        expect((0, math_1.default)(0, 5)).toBe(0);
    });
});
