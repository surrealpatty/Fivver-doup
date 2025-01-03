import 'reflect-metadata'; // Add this line at the very top to ensure Sequelize decorators work
import request from 'supertest';
import { User } from '../models/user'; // Corrected relative import
import jwt from 'jsonwebtoken'; // For mocking token validation
import { app } from '../index.js'; // Include .js extension for import

// Mocking the User model and JWT methods
jest.mock('../models/user', () => ({
    User: {
        create: jest.fn(),
        findOne: jest.fn(),
    },
}));
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));

describe('User Tests', () => {
    beforeEach(() => {
        jest.retryTimes(3); // Retries failed tests 3 times before reporting an error
    });

    describe('POST /api/users/register', () => {
        it('should register a user successfully', async () => {
            // Mock resolved value for User.create
            User.create.mockResolvedValueOnce({
                id: '1',
                email: 'test@example.com',
                username: 'testuser',
                isVerified: false,
                role: 'user',
                tier: 'free',
            });

            // Send a POST request to register endpoint
            const response = await request(app).post('/api/users/register').send({
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
            });

            // Verify the response
            expect(response.status).toBe(201); // Expecting a 201 Created status
            expect(response.body).toHaveProperty('id');
            expect(response.body.email).toBe('test@example.com');
            // Verify that User.create was called with the correct parameters
            expect(User.create).toHaveBeenCalledWith({
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
                isVerified: false,
                role: 'user',
                tier: 'free',
            });
        });

        it('should return an error if email is already taken', async () => {
            // Mock rejected value for User.create
            User.create.mockRejectedValueOnce(new Error('Email already exists'));
            const response = await request(app).post('/api/users/register').send({
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
            });
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Email already exists');
        });
    });
});
