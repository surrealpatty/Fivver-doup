import request from 'supertest';
import { app } from '../index'; // Import your Express app
import { User } from 'models/user'; // Import User model if needed for DB interactions
import Service from 'models/service';  // Import Service model for DB interactions
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for generating the token

describe('Service Routes', () => {
  let mockUserToken: string;
  let userId: string;

  // Setup before all tests to create a mock user and generate JWT token
  beforeAll(async () => {
    // Create a mock user in the database (if needed)
    const user = await User.create({ email: 'testuser@example.com', username: 'testuser', password: 'password123' });
    userId = user.id;  // Store the user ID for later tests

    // Generate a valid JWT token for that user
    mockUserToken = jwt.sign(
      { id: user.id, email: user.email, username: user.username }, // Payload
      'your_secret_key', // Secret key (should be stored securely, not hardcoded)
      { expiresIn: '1h' } // Token expiration
    );
  });

  afterAll(async () => {
    // Clean up the mock user and any associated services after all tests
    await Service.destroy({ where: { userId } });  // Delete any services created for the user
    await User.destroy({ where: { id: userId } });  // Delete the mock user
  });

  it('should create a new service', async () => {
    const response = await request(app)
      .post('/services')
      .set('Authorization', `Bearer ${mockUserToken}`)
      .send({ title: 'Test Service', description: 'This is a test service.', price: 100 });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Service created successfully.');
    expect(response.body.service).toHaveProperty('id');
    expect(response.body.service.title).toBe('Test Service');
  });

  // Add other test cases here...
});
