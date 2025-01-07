// src/test/jwt.test.ts

import { generateToken, verifyToken } from '../utils/jwt';  // Adjust the import path if necessary
import { UserPayload } from '../types';  // Correctly import from '../types'
import jwt from 'jsonwebtoken';

// Mocking jwt functions
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

// Example user object with the correct properties
const user: UserPayload = {
  id: '123',
  email: 'user@example.com',
  username: 'username',
  tier: 'paid',
  role: 'user',
};

describe('JWT Utility Functions', () => {
  describe('generateToken', () => {
    it('should generate a token successfully', () => {
      const mockToken = 'mockToken';
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const token = generateToken(user);

      expect(token).toBe(mockToken);
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: user.id,
          email: user.email,
          username: user.username,
          tier: user.tier,
          role: user.role,
        },
        process.env.JWT_SECRET_KEY || 'your-secret-key',
        { expiresIn: '1h' }
      );
    });

    it('should throw an error if token generation fails', () => {
      (jwt.sign as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Mock error');
      });

      expect(() => generateToken(user)).toThrowError('Failed to generate token');
    });
  });

  describe('verifyToken', () => {
    it('should return the decoded token for a valid token', () => {
      const mockDecoded: UserPayload = { ...user };
      (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);

      const decoded = verifyToken('validToken');
      expect(decoded).toEqual(mockDecoded);
    });

    it('should return null for an expired token', () => {
      (jwt.verify as jest.Mock).mockImplementationOnce(() => {
        throw new jwt.TokenExpiredError('jwt expired', new Date());
      });

      const result = verifyToken('expiredToken');
      expect(result).toBeNull();
    });

    it('should return null for a malformed token', () => {
      (jwt.verify as jest.Mock).mockImplementationOnce(() => {
        throw new jwt.JsonWebTokenError('jwt malformed');
      });

      const result = verifyToken('malformedToken');
      expect(result).toBeNull();
    });

    it('should return null for any other verification error', () => {
      (jwt.verify as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Some other error');
      });

      const result = verifyToken('someOtherErrorToken');
      expect(result).toBeNull();
    });
  });

  describe('generateToken and verifyToken integration', () => {
    it('should generate and verify a JWT token correctly', () => {
      const token = generateToken(user); // Generate token

      // Verify the token
      const decoded = verifyToken(token);

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
});
