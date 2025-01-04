import request from 'supertest';
import app from 'src/index';  // Ensure the correct path to your app
import { UserPayload } from 'src/types';  // Import UserPayload

// Mock authenticated user data
const mockUser: UserPayload = {
  id: '1',
  email: 'test@example.com',
  username: 'testuser',
  tier: 'paid',  // Mock the tier property here
};

describe('GET /premium-service', () => {
  it('should allow access to paid users', async () => {
    const response = await request(app)
      .get('/premium-service')
      .set('Authorization', `Bearer valid-token`) // Provide valid JWT token
      .use((req: any) => {
        // Mock req.user inside the test middleware
        req.user = mockUser;
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Premium service access granted.');
  });

  it('should deny access to non-paid users', async () => {
    const nonPaidUser: UserPayload = {
      id: '2',
      email: 'nonpaid@example.com',
      username: 'nonpaiduser',
      tier: 'free',  // Mock the tier as free
    };

    const response = await request(app)
      .get('/premium-service')
      .set('Authorization', `Bearer valid-token`) // Provide valid JWT token
      .use((req: any) => {
        // Mock req.user with a non-paid user inside the test middleware
        req.user = nonPaidUser;
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
  });
});
