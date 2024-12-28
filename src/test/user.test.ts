import request from 'supertest'; // To make HTTP requests to the app
import bcrypt from 'bcrypt'; // For hashing the password
import { app } from '../index'; // Import the app instance
import sequelize from '../config/database'; // Import the Sequelize instance
import { User } from '../models/user'; // Import the User model

describe('User Controller Tests', () => {
  let token: string; // Store token to use in tests
  let userId: string; // Store user ID to use in tests (assuming string UUID for ID)

  // Before all tests, sync the database, create a test user, and store the user ID and token
  beforeAll(async () => {
    try {
      await sequelize.sync({ force: true }); // Sync the database and reset it

      // Create a test user with a hashed password
      const testUser = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10), // Hash the password
        isPaid: false, // Add necessary field values
      });

      userId = testUser.id; // Store the created user's ID

      // Log in and get the token
      const loginResponse = await request(app)
        .post('/users/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      token = loginResponse.body.token; // Extract the token from the login response
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

  // Test user registration
  test('should register a new user', async () => {
    const response = await request(app)
      .post('/user/register') // This should match your register route path
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201); // Expect HTTP 201 Created
    expect(response.body.username).toBe('newuser'); // Expect username to match
  });

  // Test update user profile
  test('should update the user profile', async () => {
    const updateResponse = await request(app)
      .put(`/users/${userId}`) // Match your update user profile route with dynamic user ID
      .send({
        email: 'updated@example.com',
        username: 'updatedUser',
      })
      .set('Authorization', `Bearer ${token}`); // Include the token in the Authorization header

    expect(updateResponse.status).toBe(200); // Expect HTTP 200 OK
    expect(updateResponse.body).toHaveProperty('id', userId); // Expect the updated user ID
    expect(updateResponse.body).toHaveProperty('email', 'updated@example.com'); // Expect the updated email
  });

  // Test delete user account
  test('should delete the user account', async () => {
    const deleteResponse = await request(app)
      .delete(`/users/${userId}`) // Match your delete user route with dynamic user ID
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
      await User.destroy({ where: { id: userId } }); // Remove the test user from the database
      await sequelize.close(); // Close the database connection
    } catch (error) {
      console.error('Error closing test environment:', error);
    }
  });
});
