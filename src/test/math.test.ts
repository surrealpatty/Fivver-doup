// src/test/math.test.ts
import * as mathLib from 'math-lib'; // If it's an npm package

describe('Math Function Tests', () => {
  it('should add two numbers correctly', () => {
    const result = mathLib.add(2, 3);
    expect(result).toBe(5);
  });

  // Other test cases can follow
});
