import request from 'supertest';
import { app } from '../index';  // Adjust to the path where your Express app is initialized

describe('Authentication Controller', () => {
  it('should authenticate a user and return a token', async () => {
    const response = await request(app)
      .post('/auth/login')  // Replace with your actual login route
      .send({
        email: 'user@example.com',
        password: 'correctPassword',
      });

    expect(response.status).toBe(200);  // Adjust based on your expected status code
    expect(response.body.token).toBeDefined();
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')  // Replace with your actual login route
      .send({
        email: 'user@example.com',
        password: 'wrongPassword',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });
});
