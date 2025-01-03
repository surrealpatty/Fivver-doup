"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Add this line at the very top to ensure Sequelize decorators work
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../models/user"); // Corrected relative import
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // For mocking token validation
const index_1 = require("../../index.js"); // Corrected import to use the transpiled file from dist folder
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
            const response = await (0, supertest_1.default)(index_1.app).post('/api/users/register').send({
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
            const response = await (0, supertest_1.default)(index_1.app).post('/api/users/register').send({
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
            });
            expect(response.status).toBe(400); // Correcting the expected status
            expect(response.body).toHaveProperty('error', 'Email already exists');
        });
    });
    describe('Role-based Access Control', () => {
        beforeEach(() => {
            // Mock JWT.verify to simulate token validation
            jsonwebtoken_1.default.verify.mockImplementation((token) => {
                if (token === 'valid_paid_user_token') {
                    return { role: 'paid' };
                }
                else if (token === 'valid_free_user_token') {
                    return { role: 'free' };
                }
                else {
                    throw new Error('Invalid token');
                }
            });
        });
        it('should allow access to paid users', async () => {
            const response = await (0, supertest_1.default)(index_1.app)
                .get('/premium-content')
                .set('Authorization', 'Bearer valid_paid_user_token');
            expect(response.status).toBe(200); // Correcting expected status
            expect(response.body.message).toBe('Welcome to the premium content!');
        });
        it('should deny access to free users for premium content', async () => {
            const response = await (0, supertest_1.default)(index_1.app)
                .get('/premium-content')
                .set('Authorization', 'Bearer valid_free_user_token');
            expect(response.status).toBe(403); // Correcting expected status for forbidden access
            expect(response.body.message).toBe('Access forbidden: Insufficient role');
        });
        it('should allow access to free content for all users', async () => {
            const response = await (0, supertest_1.default)(index_1.app)
                .get('/free-content')
                .set('Authorization', 'Bearer valid_free_user_token');
            expect(response.status).toBe(200); // Correct expected status for free content
            expect(response.body.message).toBe('Welcome to the free content!');
        });
        it('should return an error for invalid tokens', async () => {
            const response = await (0, supertest_1.default)(index_1.app)
                .get('/premium-content')
                .set('Authorization', 'Bearer invalid_token');
            expect(response.status).toBe(401); // Correcting expected status for unauthorized
            expect(response.body.message).toBe('Unauthorized');
        });
    });
});
