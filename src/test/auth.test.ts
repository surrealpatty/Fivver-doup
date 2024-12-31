import request from 'supertest';
import jwt from 'jsonwebtoken';  // Import jsonwebtoken for JWT verification
import { app } from '../index';  // Corrected import to use named import


describe('Authentication Tests', () => {
  it('should authenticate and return a valid JWT token', async () => {
    // Example request to authenticate and get a token
    const response = await request(app)  // Use supertest to make a request to the app
      .post('/login')  // Adjust the route based on your actual route
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    // Ensure the response includes a valid token
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();

    // Decode the token to verify its contents (if JWT is used)
    const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
    expect(decoded).toHaveProperty('id');
    expect(decoded).toHaveProperty('email');
  });
});
