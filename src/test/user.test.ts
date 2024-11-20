import request from 'supertest';
import { app, server } from '../index'; // Import app and server from index.ts
import User from '../models/user'; // User model
import jwt from 'jsonwebtoken'; // JSON Web Token library
import { sequelize } from '../config/database'; // Sequelize instance

// Mocking User model and JWT
jest.mock('../models/user', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mockedToken'), // Mocked token for signing
    verify: jest.fn(() => ({ userId: 1 })), // Mocked decoded token
}));

describe('User Controller Tests', () => {
    beforeAll(async () => {
        // Set up mocked responses
        (User.findOne as jest.MockedFunction<typeof User.findOne>).mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',
        } as any);

        (User.create as jest.MockedFunction<typeof User.create>).mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',
        } as any);

        (User.findByPk as jest.MockedFunction<typeof User.findByPk>).mockResolvedValue({
            id: 1,
            email: 'test@example.com',
        } as any);

        (User.update as jest.MockedFunction<typeof User.update>).mockResolvedValue([1]); // Sequelize update returns [affectedRows]
        (User.destroy as jest.MockedFunction<typeof User.destroy>).mockResolvedValue(1); // Return affected rows count
    });

    afterAll(async () => {
        // Close Sequelize connection and Express server
        await sequelize.close();
        server.close();
    });

    test('should log in a user and return a token', async () => {
        const response = await request(app)
            .post('/users/login') // Login route
            .send({
                email: 'test@example.com',
                password: 'password123', // Mocked login credentials
            });

        expect(response.status).toBe(200); // Expect HTTP 200 OK
        expect(response.body).toHaveProperty('token', 'mockedToken'); // Mocked token
    });

    test('should update the user profile', async () => {
        const response = await request(app)
            .put('/users/profile') // Profile update route
            .set('Authorization', 'Bearer mockedToken') // Mocked Authorization header
            .send({
                email: 'updated@example.com',
                password: 'newpassword123',
            });

        expect(response.status).toBe(200); // Expect HTTP 200 OK
        expect(response.body).toHaveProperty('id', 1); // Updated user ID
        expect(response.body).toHaveProperty('email', 'updated@example.com'); // Updated email
    });

    test('should delete the user account', async () => {
        const response = await request(app)
            .delete('/users/profile') // Delete user route
            .set('Authorization', 'Bearer mockedToken'); // Mocked Authorization header

        expect(response.status).toBe(200); // Expect HTTP 200 OK
        expect(response.body).toHaveProperty('message', 'User deleted successfully'); // Deletion message
    });
}, 10000); // Increased timeout for longer tests
