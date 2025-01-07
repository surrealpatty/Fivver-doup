import { generateToken, verifyToken } from './jwt';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';

// Mock the JWT methods to avoid actual signing and verifying during tests
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe('JWT Utility Functions', () => {
  const mockUser: UserPayload = {
    id: '123',
    email: 'user@example.com',
    username: 'testuser',
    tier: 'free',
    role: 'user',
  };

  beforeAll(() => {
    // Mock the sign method to simulate the token generation
    (jwt.sign as jest.Mock).mockReturnValue('mock-token');
  });

  describe('generateToken', () => {
    it('should generate a token for a user', () => {
      const token = generateToken(mockUser);

      // Check if jwt.sign was called with the correct arguments
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: '123',
          email: 'user@example.com',
          username: 'testuser',
          tier: 'free',
          role: 'user',
        },
        process.env.JWT_SECRET_KEY || 'your-secret-key',
        { expiresIn: '1h' }
      );

      // Check that the returned token matches the mocked token
      expect(token).toBe('mock-token');
    });

    it('should throw an error if token generation fails', () => {
      // Mock jwt.sign to throw an error
      (jwt.sign as jest.Mock).mockImplementation(() => {
        throw new Error('Failed to generate token');
      });

      expect(() => generateToken(mockUser)).toThrow('Failed to generate token');
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token and return decoded user data', () => {
      // Mock the decoded payload
      const mockDecoded = {
        id: '123',
        email: 'user@example.com',
        username: 'testuser',
        tier: 'free',
        role: 'user',
      };

      (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);

      const decoded = verifyToken('mock-token');

      // Check if jwt.verify was called with the correct arguments
      expect(jwt.verify).toHaveBeenCalledWith('mock-token', process.env.JWT_SECRET_KEY || 'your-secret-key');
      // Check if the returned decoded data matches the mock data
      expect(decoded).toEqual(mockDecoded);
    });

    it('should return null if token verification fails', () => {
      // Mock jwt.verify to throw an error
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Token verification failed');
      });

      const decoded = verifyToken('invalid-token');
      expect(decoded).toBeNull();
    });
  });
});
