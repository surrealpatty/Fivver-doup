import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../index'; // Ensure this points to your main Express app file

// Generate JWT tokens for testing (with roles)
const paidToken = jwt.sign({ id: '1', role: 'Paid' }, process.env.JWT_SECRET as string);
const freeToken = jwt.sign({ id: '2', role: 'Free' }, process.env.JWT_SECRET as string);

describe('Role-based Access to Premium Services', () => {
  it('should allow paid users to access premium services', async () => {
    const response = await request(app)
      .get('/services/premium') // Make GET request to /services/premium
      .set('Authorization', `Bearer ${paidToken}`); // Include the token in the header
    
    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Premium service access granted.');
  });

  it('should deny free users from accessing premium services', async () => {
    const response = await request(app)
      .get('/services/premium')
      .set('Authorization', `Bearer ${freeToken}`); // Use a free token

    // Assertions
    expect(response.status).toBe(403); // Forbidden error for free users
    expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
  });

  it('should return error if no token is provided', async () => {
    const response = await request(app)
      .get('/services/premium');

    // Assertions
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Token is required');
  });

  it('should return error if token is invalid', async () => {
    const invalidToken = 'invalidToken123';
    const response = await request(app)
      .get('/services/premium')
      .set('Authorization', `Bearer ${invalidToken}`);

    // Assertions
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Invalid or expired token');
  });
});

// Test case for updating a service
describe('PUT /services/:id', () => {
  let serviceId: string;
  let token: string;

  // Before each test, create a service to update
  beforeEach(async () => {
    // Create a test service for the update test
    const response = await request(app)
      .post('/services/create')  // Assuming you have a POST route for creating services
      .send({
        title: 'Test Service',
        description: 'Test Service Description',
        price: 100,
        userId: '12345',  // Example userId, make sure this exists or is mocked in the helper
      });
    
    serviceId = response.body.id;  // Store the created service ID
    token = paidToken;  // You can mock a token using a helper function or generate one as needed
  });

  // Test case: Service should be updated successfully
  it('should update a service successfully', async () => {
    const response = await request(app)
      .put(`/services/${serviceId}`)
      .set('Authorization', `Bearer ${token}`)  // Mock authentication token
      .send({ 
        title: 'Updated Test Service Title', 
        description: 'Updated Test Service Description', 
        price: 150 
      });

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Service updated successfully');
    expect(response.body.service.title).toBe('Updated Test Service Title');
    expect(response.body.service.description).toBe('Updated Test Service Description');
    expect(response.body.service.price).toBe(150);
  });

  // Test case: Service not found (404 error)
  it('should return 404 if the service is not found', async () => {
    const response = await request(app)
      .put('/services/9999')  // Assuming service with ID 9999 does not exist
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        title: 'Non-existent Service' 
      });

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Service not found');
  });

  // Test case: Invalid data (e.g., price is not a number)
  it('should return 400 if the price is invalid', async () => {
    const response = await request(app)
      .put(`/services/${serviceId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        title: 'Invalid Service Title', 
        description: 'Description with invalid price', 
        price: 'invalid' // Invalid price value
      });

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid price value');
  });
});
