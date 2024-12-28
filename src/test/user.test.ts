import request from 'supertest'; // To make HTTP requests to the app
import { app } from '../index'; // Import the exported app instance
import sequelize from '../config/database'; // Import the Sequelize instance
import { User } from '../models/user'; // Import the User model

describe('User Controller Tests', () => {
  // Before all tests, sync the database and create a test user
  beforeAll(async () => {
    try {
      await sequelize.sync({ force: true }); // Sync the database and reset it
      // Create a test user for login and other actions
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    } catch (error) {
      console.error('Error setting up test environment:', error);
    }
  });

  // Test user login
  test('should log in a user and return a token', async () => {
    const response = await request(app)
      .post('/users/login') // Match your actual login route
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200); // Expect HTTP 200 OK
    expect(response.body).toHaveProperty('token'); // Expect a token in the response body
  });

  // Test update user profile
  test('should update the user profile', async () => {
    // Login to get the token for authentication
    const loginResponse = await request(app)
      .post('/users/login') // Match your actual login route
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    const token = loginResponse.body.token; // Extract the token

    // Update the user's profile
    const updateResponse = await request(app)
      .put('/users/1') // Match your update user profile route
      .send({
        email: 'updated@example.com',
        username: 'updatedUser',
      })
      .set('Authorization', `Bearer ${token}`); // Include the token in the Authorization header

    expect(updateResponse.status).toBe(200); // Expect HTTP 200 OK
    expect(updateResponse.body).toHaveProperty('id', 1); // Expect the updated user ID
    expect(updateResponse.body).toHaveProperty('email', 'updated@example.com'); // Expect the updated email
  });

  // Test delete user account
  test('should delete the user account', async () => {
    // Login to get the token for authentication
    const loginResponse = await request(app)
      .post('/users/login') // Match your actual login route
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    const token = loginResponse.body.token; // Extract the token

    // Delete the user's account
    const deleteResponse = await request(app)
      .delete('/users/1') // Match your delete user route
      .set('Authorization', `Bearer ${token}`); // Include the token in the Authorization header

    expect(deleteResponse.status).toBe(200); // Expect HTTP 200 OK
    expect(deleteResponse.body).toHaveProperty(
      'message',
      'User deleted successfully'
    ); // Expect a success message
  });

  // After all tests, clean up the test user and close the Sequelize connection
  afterAll(async () => {
    try {
      await sequelize.close(); // Close the database connection
    } catch (error) {
      console.error('Error closing test environment:', error);
    }
  });
});
