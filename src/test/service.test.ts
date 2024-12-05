import request from 'supertest';
import { app } from '../index'; // Import your Express app
import { createMockUserToken } from './testHelpers'; // Import helper function to generate mock JWT tokens for users
import { User } from 'models/user'; // Import User model if needed for DB interactions
import Service from 'models/service';  // Import Service model for DB interactions

describe('Service Routes', () => {
  let mockUserToken: string;
  let userId: string;

  // Setup before all tests to create a mock user and generate JWT token
  beforeAll(async () => {
    // Create a mock user in the database (if needed)
    const user = await User.create({ email: 'testuser@example.com', username: 'testuser', password: 'password123' });
    userId = user.id;  // Store the user ID for later tests

    // Generate a valid JWT token for that user
    mockUserToken = createMockUserToken({ id: user.id, email: user.email, username: user.username });
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

  it('should fail to create a service if required fields are missing', async () => {
    const response = await request(app)
      .post('/services')
      .set('Authorization', `Bearer ${mockUserToken}`)
      .send({ title: 'Test Service' }); // Missing description and price

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Missing required fields: userId, title, description, and price are mandatory.');
  });

  it('should update an existing service', async () => {
    // First, create a service to update
    const createResponse = await request(app)
      .post('/services')
      .set('Authorization', `Bearer ${mockUserToken}`)
      .send({ title: 'Old Service', description: 'Old description', price: 50 });

    const serviceId = createResponse.body.service.id;

    // Now, update the service
    const updateResponse = await request(app)
      .put(`/services/${serviceId}`)
      .set('Authorization', `Bearer ${mockUserToken}`)
      .send({ title: 'Updated Service', description: 'Updated description', price: 75 });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.message).toBe('Service updated successfully.');
    expect(updateResponse.body.service.title).toBe('Updated Service');
    expect(updateResponse.body.service.price).toBe(75);
  });

  it('should fail to update a service if service does not exist', async () => {
    const updateResponse = await request(app)
      .put('/services/99999') // Using an invalid service ID
      .set('Authorization', `Bearer ${mockUserToken}`)
      .send({ title: 'Updated Service', description: 'Updated description', price: 75 });

    expect(updateResponse.status).toBe(404);
    expect(updateResponse.body.message).toBe('Service not found.');
  });

  it('should delete a service', async () => {
    // First, create a service to delete
    const createResponse = await request(app)
      .post('/services')
      .set('Authorization', `Bearer ${mockUserToken}`)
      .send({ title: 'Service to Delete', description: 'This service will be deleted.', price: 30 });

    const serviceId = createResponse.body.service.id;

    // Now, delete the service
    const deleteResponse = await request(app)
      .delete(`/services/${serviceId}`)
      .set('Authorization', `Bearer ${mockUserToken}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toBe('Service deleted successfully.');

    // Verify the service is deleted
    const getResponse = await request(app).get(`/services/${serviceId}`);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.message).toBe('Service not found.');
  });

  it('should fail to delete a service if the user is not the owner', async () => {
    // Create a service for another user (assuming user with id '2' exists)
    const otherUserToken = createMockUserToken({ id: '2', email: 'another@example.com', username: 'anotheruser' });
    const createResponse = await request(app)
      .post('/services')
      .set('Authorization', `Bearer ${otherUserToken}`)
      .send({ title: 'Another User\'s Service', description: 'Service from another user', price: 40 });

    const serviceId = createResponse.body.service.id;

    // Try deleting it as the first user (should fail)
    const deleteResponse = await request(app)
      .delete(`/services/${serviceId}`)
      .set('Authorization', `Bearer ${mockUserToken}`);

    expect(deleteResponse.status).toBe(403);
    expect(deleteResponse.body.message).toBe('Forbidden: You can only delete your own services.');
  });
});
