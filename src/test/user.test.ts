import request from 'supertest'; // To make HTTP requests to the app
import { app } from '@src/index'; // Import the app instance using the alias
import { sequelize } from '@config/database'; // Correct import for named export with alias
import { User } from '@models/user'; // Import the User model using the alias

describe('User Controller Tests', () => {
  let token: string; // Store token to use in tests
  let userId: string; // Store user ID to use in tests (assuming string UUID for ID)

  // Set up the user before tests
  beforeAll(async () => {
    try {
      // Sync the database and reset it before running tests
      await sequelize.sync({ force: true });

      // Register the user (or create a test user manually)
      const registerResponse = await request(app)
        .post('/api/users/register')  // Use the correct registration route
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          isPaid: false,
        });

      // Ensure the user ID and token are set correctly
      userId = registerResponse.body.id; // Assuming the response contains the user ID
      token = registerResponse.body.token; // Assuming the token is returned upon registration (if needed)
    } catch (error) {
      console.error('Error setting up test environment:', error);
    }
  });

  // Test user login
  test('should log in a user and return a token', async () => {
    const response = await request(app)
      .post('/api/users/login') // Match your actual login route
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
      .post('/api/users/register') // Ensure this matches the registration route
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        isPaid: false, // Ensure `isPaid` is included
      });

    expect(response.status).toBe(201); // Expect HTTP 201 Created
    expect(response.body.username).toBe('newuser'); // Expect username to match
  });

  // Test update user profile
  test('should update the user profile', async () => {
    const updateResponse = await request(app)
      .put(`/api/users/${userId}`) // Match your update user profile route with dynamic user ID
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
    // Ensure userId is defined before attempting to delete
    expect(userId).toBeDefined();  // Check if userId is correctly set

    // Perform the delete request using the user ID
    const deleteResponse = await request(app)
      .delete(`/api/users/${userId}`) // Match your delete route with dynamic user ID
      .set('Authorization', `Bearer ${token}`); // Include the token in the Authorization header

    // Check the response
    expect(deleteResponse.status).toBe(200);  // Expect 200 status on successful deletion
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
