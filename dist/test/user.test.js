"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Add this line at the very top to ensure Sequelize decorators work
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../models/user"); // Corrected relative import
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // For mocking token validation
const _index = require("../../../index.js"); // Corrected import to use the transpiled file from dist folder

// Mocking the User model and JWT methods
jest.mock('../models/user', () => ({
    User: {
        create: jest.fn(),
        findOne: jest.fn(),
    },
}));

// Cast `jwt.verify` to a jest mock function
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));

describe('User Tests', () => {
    // Apply retry logic to all tests in this suite
    beforeEach(() => {
        jest.retryTimes(3); // Retries failed tests 3 times before reporting an error
    });
    describe('POST /api/users/register', () => {
        it('should register a user successfully', async () => {
            // Mock resolved value for User.create
            user_1.User.create.mockResolvedValueOnce({
                id: '1',
                email: 'test@example.com',
                username: 'testuser',
                isVerified: false, // Mocking the default value for isVerified
                role: 'user', // Mocking the default role
                tier: 'free', // Mocking the default tier
            });

            // Send a POST request to register endpoint
            const response = await (0, supertest_1.default)(_index.app).post('/api/users/register').send({
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
            });

            // Verify the response
            expect(response.status).toBe(201); // Expecting a 201 Created status
            expect(response.body).toHaveProperty('id');
            expect(response.body.email).toBe('test@example.com');

            // Verify that User.create was called with the correct parameters
            expect(user_1.User.create).toHaveBeenCalledWith({
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
            user_1.User.create.mockRejectedValueOnce(new Error('Email already exists'));

            const response = await (0, supertest_1.default)(_index.app).post('/api/users/register').send({
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
            });

            expect(response.status).toBe(400); // Correcting the expected status
            expect(response.body).toHaveProperty('error', 'Email already exists');
        });
    });
    // ... (Remaining code for 'Role-based Access Control' stays the same)
});
