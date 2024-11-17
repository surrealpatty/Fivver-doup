import request from 'supertest'; // Correct import for supertest
import { app } from '../index';  // Correct path to the app
import User from '../models/user'; // Import the User model

// Mock the necessary methods for the User model
jest.mock('../models/user', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));

// Mocking jwt (if needed)
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mockedToken'),  // Mock JWT token generation
    verify: jest.fn(() => ({ userId: 1 })),  // Mock token verification
}));

describe('User Controller', () => {

    beforeAll(() => {
        // Set up mock return values for methods used in tests
        (User.findOne as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',  // Mocked hashed password
        });  // Mock for login or finding a user by email

        (User.create as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',
        });  // Mock for user creation during registration

        (User.findByPk as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'test@example.com',
        });  // Mock for finding a user profile by ID

        (User.update as jest.Mock).mockResolvedValue([1]);  // Mock for updating user profile

        (User.destroy as jest.Mock).mockResolvedValue(1);  // Mock for deleting user account
    });

    afterAll(() => {
        jest.clearAllMocks();  // Clear mocks after all tests
    });

    test('should login a user and return a token', async () => {
        const response = await request(app)
            .post('/api/users/login')  // Ensure the correct login route
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        console.log(response.status, response.body);  // Log response for debugging

        expect(response.status).toBe(200);  // Check if status is 200 OK
        expect(response.body).toHaveProperty('token', 'mockedToken');  // Ensure token is present
    });

    test('should update user profile', async () => {
        const response = await request(app)
            .put('/api/users/profile')  // Ensure the correct profile update route
            .set('Authorization', 'Bearer mockedToken')  // Use mocked token for auth
            .send({
                email: 'updated@example.com',
                password: 'newpassword123',
            });

        console.log(response.status, response.body);  // Log response for debugging

        expect(response.status).toBe(200);  // Check if status is 200 OK
        expect(response.body).toHaveProperty('id', 1);  // Ensure user ID is returned
        expect(response.body).toHaveProperty('email', 'updated@example.com');  // Ensure updated email
    });

    test('should delete user account', async () => {
        const response = await request(app)
            .delete('/api/users/profile')  // Ensure the correct delete route
            .set('Authorization', 'Bearer mockedToken');  // Use mocked token for auth

        console.log(response.status, response.body);  // Log response for debugging

        expect(response.status).toBe(200);  // Check if status is 200 OK
        expect(response.body).toHaveProperty('message', 'User deleted successfully');  // Ensure success message
    });
});
