import request from 'supertest'; // to make HTTP requests to the app
import { app } from '../index'; // assuming this is the Express app
import sequelize from '../config/database'; // Correct import for default export
import { User } from '../models/user'; // Correct named import for User model

describe('User Controller Tests', () => {
  // Before all tests, sync the database and create a test user
  beforeAll(async () => {
    await sequelize.sync(); // Sync the database
    // Create a test user for login and other actions
    await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
  });

  // Test user login
  test('should log in a user and return a token', async () => {
    const response = await request(app)
      .post('/login') // Ensure this path matches your actual login route
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200); // Expect HTTP 200 OK
    expect(response.body).toHaveProperty('token'); // Expect a token in the response body
  });

  // Test update user profile
  test('should update the user profile', async () => {
    const loginResponse = await request(app)
      .post('/login') // Login to get the token for authentication
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    const token = loginResponse.body.token; // Get the token from the login response

    const updateResponse = await request(app)
      .put('/users/1') // Assuming this is the correct route for updating user profile
      .send({
        email: 'updated@example.com',
        username: 'updatedUser',
      })
      .set('Authorization', `Bearer ${token}`); // Send the token in the Authorization header

    expect(updateResponse.status).toBe(200); // Expect HTTP 200 OK
    expect(updateResponse.body).toHaveProperty('id', 1); // Expect the updated user ID
    expect(updateResponse.body).toHaveProperty('email', 'updated@example.com'); // Expect the updated email
  });

  // Test delete user account
  test('should delete the user account', async () => {
    const loginResponse = await request(app)
      .post('/login') // Login to get the token for authentication
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    const token = loginResponse.body.token; // Get the token from the login response

    const deleteResponse = await request(app)
      .delete('/users/1') // Assuming this is the correct route for deleting the user account
      .set('Authorization', `Bearer ${token}`); // Send the token in the Authorization header

    expect(deleteResponse.status).toBe(200); // Expect HTTP 200 OK
    expect(deleteResponse.body).toHaveProperty(
      'message',
      'User deleted successfully'
    ); // Expect a success message
  });

  // After all tests, delete the test user and close the Sequelize connection
  afterAll(async () => {
    await User.destroy({ where: { email: 'test@example.com' } }); // Clean up the test user
    await sequelize.close(); // Close the database connection
  });
});
