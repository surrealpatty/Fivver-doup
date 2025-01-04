import request from 'supertest';
import app from '../index'; // Adjust path if necessary
import { UserPayload } from '../types'; // Ensure correct import path for UserPayload
import jwt from 'jsonwebtoken'; // For generating mock JWT tokens

// Mock JWT token generation for paid and free users
const generateToken = (user: UserPayload, secretKey: string) => {
  return jwt.sign(user, secretKey, { expiresIn: '1h' });
};

// Mock user data
const mockPaidUser: UserPayload = {
  id: '1',
  email: 'paiduser@example.com',
  username: 'paiduser',
  tier: 'paid',
};

const mockFreeUser: UserPayload = {
  id: '2',
  email: 'freeuser@example.com',
  username: 'freeuser',
  tier: 'free',
};

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
