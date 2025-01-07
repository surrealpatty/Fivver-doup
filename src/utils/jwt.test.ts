import { generateToken, verifyToken } from './jwt';
import { UserPayload } from '../types';
import jwt from 'jsonwebtoken';

// Mock JWT methods to avoid actual signing and verifying
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe('JWT Utilities', () => {
  const mockUser: UserPayload = {
    id: '123',
    email: 'user@example.com',
    username: 'testuser',
    tier: 'free',
    role: 'user',
  };

  describe('generateToken', () => {
    it('should generate a token for a user', () => {
      // Mock JWT sign
      (jwt.sign as jest.Mock).mockReturnValue('mock-token');

      const token = generateToken(mockUser);

      // Check that jwt.sign was called with correct arguments
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
    it('should verify a token and return decoded user data', () => {
      // Mock JWT verify
      const mockDecoded = {
        id: '123',
        email: 'user@example.com',
        username: 'testuser',
        tier: 'free',
        role: 'user',
      };
      (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);

      const decoded = verifyToken('mock-token');

      expect(jwt.verify).toHaveBeenCalledWith('mock-token', process.env.JWT_SECRET_KEY || 'your-secret-key');
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
