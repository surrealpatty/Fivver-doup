import request from 'supertest';
import app from '../index'; // Ensure this is the correct import path to your app
import jwt from 'jsonwebtoken';
import { sequelize } from '../config/database'; // Correct path to your sequelize instance
import { UserPayload } from '../types'; // Correct import path for UserPayload
import { UserTier } from '../types'; // Import UserTier enum for correct tier values
import { Service } from '../models/services';  // Service model import

// Mock JWT token generation for paid and free users
const generateToken = (user: UserPayload, secretKey: string): string => {
  return jwt.sign(user, secretKey, { expiresIn: '1h' });
};

// Mock user data
const mockPaidUser: UserPayload = {
  id: '1',
  email: 'paiduser@example.com',
  username: 'paiduser',
  tier: UserTier.Paid, // Use UserTier.Paid instead of 'paid'
};

const mockFreeUser: UserPayload = {
  id: '2',
  email: 'freeuser@example.com',
  username: 'freeuser',
  tier: UserTier.Free, // Use UserTier.Free instead of 'free'
};

// Mock the `jsonwebtoken` module before any tests run
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockImplementation((user: UserPayload, secret: string) => {
    return `mocked-token-${user.id}`;  // Mocked token generation
  }),
  verify: jest.fn().mockImplementation((token: string, secret: string) => {
    // Mock behavior based on the token (this is a simplified version for your case)
    if (token === 'mocked-token-1') {
      return { id: '1', username: 'paiduser', tier: UserTier.Paid };  // Ensure tier is valid
    }
    if (token === 'mocked-token-2') {
      return { id: '2', username: 'freeuser', tier: UserTier.Free };  // Ensure tier is valid
    }
    throw new Error('Invalid token');
  }),
}));

// Mock the `authenticateToken` middleware to inject user data
jest.mock('../middlewares/authenticateToken', () => {
  return (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const user = jwt.verify(token, 'your-secret-key') as UserPayload;
        req.user = user; // Attach the user to the request
      } catch (error) {
        req.user = undefined;
      }
    }
    next();
  };
});

// Setup and teardown hooks for database connection
beforeAll(async () => {
  // Connect to the database before running the tests
  await sequelize.authenticate();
  await sequelize.sync({ force: true }); // Ensure models are synced before tests
});

afterAll(async () => {
  // Close the database connection after tests
  await sequelize.close();
});

describe('GET /premium-service', () => {
  it('should allow access to paid users', async () => {
    const token = generateToken(mockPaidUser, 'your-secret-key');

    const response = await request(app)
      .get('/premium-service')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Premium service access granted.');
  });

  it('should deny access to non-paid users', async () => {
    const token = generateToken(mockFreeUser, 'your-secret-key');

    const response = await request(app)
      .get('/premium-service')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).get('/premium-service');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Unauthorized. Please log in.');
  });
});
