// src/test/service.test.ts

// Correct import of the helper function
import { createMockUserToken } from './testHelpers';

describe('Service tests', () => {
  it('should mock a user token', () => {
    const userId = '12345';  // Example user ID
    const token = createMockUserToken(userId);
    console.log(token);  // This is where you'd use the token in your test
    expect(token).toBeTruthy();  // Ensure token is truthy (i.e., not null or undefined)
  });
});
