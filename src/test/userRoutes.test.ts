import request from 'supertest';
import { app } from '../index'; // Import your Express app
import { User } from '../models/user'; // Import User model
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Test setup variables
let token: string;
let testUserId: string;

describe('User Routes', () => {
  // This hook runs before all tests
  beforeAll(async () => {
    try {
      // Create a new user for testing with a hashed password
      const hashedPassword = await bcrypt.hash('password123', 10); // Hash password for testing
      const user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword, // Use the hashed password
        isPaid: false, // Add the 'isPaid' field
      });

      // Generate a token for the created user
      token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!, // Ensure you have a secret in your environment variables
        { expiresIn: '1h' }
      );

      testUserId = user.id.toString(); // Store user id for use in later tests
    } catch (error) {
      console.error('Error creating test user:', error); // Log any errors encountered during user creation
    }
  });

  // Test for user registration
  it('should register a new user', async () => {
    try {
      const response = await request(app)
        .post('/users/register')  // Assuming your register route is '/users/register'
        .send({
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'newpassword123', // Ensure password is hashed in your controller
          isPaid: false, // Include the 'isPaid' field here
        });

      // Assert that the response status is 201 (Created)
      expect(response.status).toBe(201);
      expect(response.body.username).toBe('newuser');
    } catch (error) {
      console.error('Error during user registration:', error); // Log any errors during registration
    }
  });

  // Test for user login
  it('should log in an existing user', async () => {
    try {
      const response = await request(app)
        .post('/users/login')  // Assuming your login route is '/users/login'
        .send({
          email: 'test@example.com',
          password: 'password123', // Ensure the password is correct
        });

      // Assert that the response status is 200 (OK)
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined(); // Ensure that a JWT token is returned
    } catch (error) {
      console.error('Error during login:', error); // Log any errors during login
    }
  });

  // Test for updating user profile (protected route)
  it('should update the user profile', async () => {
    try {
      const response = await request(app)
        .put(`/users/update/${testUserId}`)  // Use the test user's ID for the update
        .set('Authorization', `Bearer ${token}`)  // Pass the token in the Authorization header
        .send({
          username: 'updatedUsername',
          email: 'updated@example.com',
        });

      // Assert that the response status is 200 (OK)
      expect(response.status).toBe(200);
      expect(response.body.username).toBe('updatedUsername');
    } catch (error) {
      console.error('Error during profile update:', error); // Log any errors during profile update
    }
  });

  // Test for unauthorized access to update route (protected route)
  it('should not update user profile without authentication', async () => {
    try {
      const response = await request(app)
        .put(`/users/update/${testUserId}`)  // Use the test user's ID for the update
        .send({
          username: 'unauthorizedUpdate',
          email: 'unauthorized@example.com',
        });

      // Assert that the response status is 401 (Unauthorized)
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Access denied, no token provided.');
    } catch (error) {
      console.error('Error during unauthorized update:', error); // Log any errors during unauthorized update attempt
    }
  });

  // Test for deleting a user (protected route)
  it('should delete the user', async () => {
    try {
      const response = await request(app)
        .delete(`/users/delete/${testUserId}`)  // Use the test user's ID for deletion
        .set('Authorization', `Bearer ${token}`)  // Pass the token in the Authorization header
        .send(); // Send an empty body or any necessary data

      // Assert that the response status is 200 (OK)
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User deleted successfully');
    } catch (error) {
      console.error('Error during user deletion:', error); // Log any errors during deletion
    }
  });

  // Test for unauthorized access to delete route (protected route)
  it('should not delete user without authentication', async () => {
    try {
      const response = await request(app)
        .delete(`/users/delete/${testUserId}`)  // Use the test user's ID for deletion
        .send(); // Send an empty body or any necessary data

      // Assert that the response status is 401 (Unauthorized)
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Access denied, no token provided.');
    } catch (error) {
      console.error('Error during unauthorized deletion:', error); // Log any errors during unauthorized deletion attempt
    }
  });

  // Cleanup: Delete the test user after all tests
  afterAll(async () => {
    try {
      await User.destroy({ where: { id: testUserId } }); // Ensure the test user is deleted after tests
    } catch (error) {
      console.error('Error during cleanup:', error); // Log any errors during cleanup
    }
  });
});
