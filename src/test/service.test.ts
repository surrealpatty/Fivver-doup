import request from 'supertest';
import app from '../index';  // Ensure this points to your Express app file
import { createMockUserToken } from './testHelpers';  // Assuming this is your helper function for generating tokens

describe('PUT /services/:id', () => {
  let serviceId: string;
  let token: string;  // Mock or actual token if authentication is required

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
    token = createMockUserToken('12345');  // Generate or mock a token using a helper function
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

    // Check that the status is 200 (OK)
    expect(response.status).toBe(200);
    // Check that the response message matches
    expect(response.body.message).toBe('Service updated successfully');
    // Check that the service fields are updated
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

    // Check that the status is 404 (Not Found)
    expect(response.status).toBe(404);
    // Check that the error message matches
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
        price: 'invalid' 
      });

    // Check that the status is 400 (Bad Request)
    expect(response.status).toBe(400);
    // Check that the error message matches
    expect(response.body.message).toBe('Invalid price value');
  });
});
