// src/test/jwt.test.ts

import { generateToken, verifyToken } from '../utils/jwt';  // Adjust the import path if necessary
import { UserPayload } from '../types';  // Correctly import from '../types'

// Example user object with the correct properties
const user: UserPayload = {
  id: '123',
  email: 'user@example.com',
  username: 'username',
  tier: 'paid',
  role: 'user',
};

describe('JWT Token Generation and Verification', () => {
  it('should generate and verify a JWT token correctly', () => {
    // Generate token
    const token = generateToken(user);
    console.log('Generated Token:', token);

    // Verify the token
    const decoded = verifyToken(token);
    console.log('Decoded User:', decoded);

    // Assert that the decoded token matches the user information
    if (decoded) {
      expect(decoded.id).toBe(user.id);
      expect(decoded.email).toBe(user.email);
      expect(decoded.username).toBe(user.username);
      expect(decoded.tier).toBe(user.tier);
      expect(decoded.role).toBe(user.role);
    } else {
      fail('Token verification failed');  // Fail the test if the token could not be decoded
    }
  });
});
