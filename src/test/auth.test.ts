import { authenticateToken } from '../middlewares/authMiddleware'; // Ensure the correct relative path
import jwt from 'jsonwebtoken'; // Correct import for jwt
import request from 'supertest'; // Import supertest for simulating requests
import express from 'express'; // Import express to create a test app

// Mock express app setup for testing the middleware
const app = express();

// Middleware for testing
app.use(authenticateToken);

// Test route to use for triggering the middleware
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Authenticated' });
});

describe('Authentication Middleware', () => {
  let validToken: string;
  let invalidToken: string;

  beforeEach(() => {
    // Setup a valid token and an invalid token
    validToken = jwt.sign(
      { userId: 1 },
      process.env.JWT_SECRET || 'testsecret',
      { expiresIn: '1h' }
    );
    invalidToken = 'invalidtoken';
  });

  test('should authenticate a valid token', async () => {
    const response = await request(app)
      .get('/test')
      .set('Authorization', `Bearer ${validToken}`); // Set the Authorization header with the valid token

    expect(response.status).toBe(200); // Status should be 200 OK
    expect(response.body.message).toBe('Authenticated'); // Ensure the message is returned as expected
  });

  test('should return an error for an invalid token', async () => {
    const response = await request(app)
      .get('/test')
      .set('Authorization', `Bearer ${invalidToken}`); // Set the Authorization header with the invalid token

    expect(response.status).toBe(403); // Status should be 403 Forbidden
    expect(response.body.message).toBe('Invalid token'); // Check for the expected error message
  });

  test('should return an error if token is missing', async () => {
    const response = await request(app).get('/test'); // No Authorization header set

    expect(response.status).toBe(401); // Status should be 401 Unauthorized
    expect(response.body.message).toBe('Token required'); // Check for the expected error message
  });
});
