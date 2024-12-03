import request from 'supertest';
import  app  from '../index'; // Import the app instance
import jwt from 'jsonwebtoken'; // For generating tokens

// Helper function to generate JWT token with a role
const generateToken = (userId: string, role: 'Free' | 'Paid') => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

describe('Role-based Access', () => {
  const paidToken = generateToken('1', 'Paid');  // Generate token for paid user
  const freeToken = generateToken('2', 'Free');  // Generate token for free user

  // Test case for allowing paid users to access premium services
  it('should allow paid users to access premium services', async () => {
    const response = await request(app)
      .get('/services/premium')
      .set('Authorization', `Bearer ${paidToken}`); // Send the paid user's token

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Premium service access granted.');
  });

  // Test case for denying free users from accessing premium services
  it('should deny free users from accessing premium services', async () => {
    const response = await request(app)
      .get('/services/premium')
      .set('Authorization', `Bearer ${freeToken}`); // Send the free user's token

    expect(response.status).toBe(403); // Forbidden
    expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
  });
});