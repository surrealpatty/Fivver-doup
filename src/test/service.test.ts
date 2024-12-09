// src/test/service.test.ts
import request from 'supertest';
import { app } from '../index';  // Ensure this points to your Express app file
import { createMockUserToken } from './testHelpers';  // Assuming this is your helper function for generating tokens

describe('PUT /services/:id', () => {
  // Mock user token for authentication
  const userId = '12345';  // Example user ID
  const token = createMockUserToken(userId);  // Generate mock token

  // Test case: Service should be updated successfully
  it('should update a service successfully', async () => {
    // Assuming you have a service with ID 1 in your database for this test
    const response = await request(app)
      .put('/services/1')
      .set('Authorization', `Bearer ${token}`)  // Mock authentication token
      .send({ name: 'Updated Service Title', description: 'Updated description', price: 150 });

    // Check that the status is 200 (OK)
    expect(response.status).toBe(200);
    // Check that the response message matches
    expect(response.body.message).toBe('Service updated successfully');
    // Check that the service fields are updated
    expect(response.body.service.name).toBe('Updated Service Title');
    expect(response.body.service.description).toBe('Updated description');
    expect(response.body.service.price).toBe(150);
  });

  // Test case: Service not found (404 error)
  it('should return 404 if the service is not found', async () => {
    // Test with an ID that doesn't exist in the database (e.g., ID 9999)
    const response = await request(app)
      .put('/services/9999')  // Assuming service with ID 9999 does not exist
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Non-existent service' });

    // Check that the status is 404 (Not Found)
    expect(response.status).toBe(404);
    // Check that the error message matches
    expect(response.body.message).toBe('Service not found');
  });

  // Test case: Invalid data (e.g., price is not a number)
  it('should return 400 if the price is invalid', async () => {
    const response = await request(app)
      .put('/services/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Invalid Service Title', description: 'Description with invalid price', price: 'invalid' });

    // Check that the status is 400 (Bad Request)
    expect(response.status).toBe(400);
    // Check that the error message matches
    expect(response.body.message).toBe('Invalid price value');
  });
});
