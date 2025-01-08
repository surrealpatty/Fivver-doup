import request from 'supertest';
import  app  from '../index';  // Adjust to the path where your Express app is initialized
import { authenticateUser } from '../controllers/authController'; // Adjust to your actual controller import
import { generateToken } from '../utils/jwt';
import  User  from '../models/user'; // Assuming the User model is imported from this path
import bcrypt from 'bcryptjs';

// Mocking dependencies
jest.mock('../utils/jwt', () => ({
  generateToken: jest.fn(),
}));

jest.mock('../models/user', () => ({
  User: {
    findOne: jest.fn(),
  },
}));

describe('Auth Controller Tests', () => {
  const mockRequest = (body: any) => ({
    body,
  } as any); // This creates a mock request object

  const mockResponse = () => {
    const res = {} as any; // Mocking the response object
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('POST /auth/login', () => {
    it('should authenticate a user and return a token for valid credentials', async () => {
      const req = mockRequest({
        email: 'test@example.com',
        password: 'testpassword',
      });
      const res = mockResponse();

      // Mocking the user response from the database
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        password: await bcrypt.hash('testpassword', 10), // bcrypt hash for "testpassword"
        tier: 'free',
        role: 'user',
      };

      // Mocking User.findOne to return the mock user
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      
      const mockToken = 'mock-token';
      (generateToken as jest.Mock).mockReturnValue(mockToken);

      await authenticateUser(req, res);

      expect(generateToken).toHaveBeenCalledWith({
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        tier: 'free',
        role: 'user',
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Authentication successful',
        token: mockToken,
      });
    });

    it('should return 401 for invalid email', async () => {
      const req = mockRequest({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      });
      const res = mockResponse();

      // Simulating user not found
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await authenticateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should return 401 for incorrect password', async () => {
      const req = mockRequest({
        email: 'test@example.com',
        password: 'wrongpassword',
      });
      const res = mockResponse();

      // Simulating user found, but password doesn't match
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        password: await bcrypt.hash('testpassword', 10), // bcrypt hash for "testpassword"
        tier: 'free',
        role: 'user',
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      await authenticateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });
  });
});
