import request from 'supertest'; 
import { app } from '../index';  // Make sure app is correctly exported from index.ts
import User from '../models/user'; 
import jwt from 'jsonwebtoken'; 
import { sequelize } from '../config/database';  // Import the sequelize instance

// Mock the User model methods
jest.mock('../models/user', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));

// Mock jsonwebtoken methods
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mockedToken'),  // Mock JWT token generation
    verify: jest.fn(() => ({ userId: 1 })),  // Mock JWT verification
}));

describe('User Controller', () => {

    beforeAll(() => {
        // Mock resolved values for User model methods
        (User.findOne as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',
        });

        (User.create as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',
        });

        (User.findByPk as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'test@example.com',
        });

        (User.update as jest.Mock).mockResolvedValue([1]);  // Mocks successful update
        (User.destroy as jest.Mock).mockResolvedValue(1);  // Mocks successful delete
    });

    afterAll(async () => {
        // Clean up after tests to close DB connections
        await sequelize.close();
    });

    test('should login a user and return a token', async () => {
        const response = await request(app)
            .post('/api/users/login')  // Adjust this to match your actual login route
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        console.log(response.status, response.body); 

        expect(response.status).toBe(200);  // Verify status code
        expect(response.body).toHaveProperty('token', 'mockedToken');  // Verify token
    });

    test('should update user profile', async () => {
        const response = await request(app)
            .put('/api/users/profile')  // Adjust this to match your actual profile update route
            .set('Authorization', 'Bearer mockedToken')  // Mocked Authorization header
            .send({
                email: 'updated@example.com',
                password: 'newpassword123',
            });

        console.log(response.status, response.body);  

        expect(response.status).toBe(200);  // Verify status code
        expect(response.body).toHaveProperty('id', 1);  // Verify user id
        expect(response.body).toHaveProperty('email', 'updated@example.com');  // Verify updated email
    });

    test('should delete user account', async () => {
        const response = await request(app)
            .delete('/api/users/profile')  // Adjust this to match your actual delete route
            .set('Authorization', 'Bearer mockedToken');  // Mocked Authorization header

        console.log(response.status, response.body);  

        expect(response.status).toBe(200);  // Verify status code
        expect(response.body).toHaveProperty('message', 'User deleted successfully');  // Verify success message
    });
});
