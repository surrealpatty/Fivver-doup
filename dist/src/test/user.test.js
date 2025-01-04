"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Ensures Sequelize decorators work
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../models/user"); // Adjusted relative import
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // For mocking token validation
const _index = require("../../index.js"); // Corrected path to point to the actual transpiled file

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
        jest.retryTimes(3); // Retries failed tests 3 times
    });

    describe('POST /api/users/register', () => {
        it('should register a user successfully', async () => {
            user_1.User.create.mockResolvedValueOnce({
                id: '1',
                email: 'test@example.com',
                username: 'testuser',
                isVerified: false,
                role: 'user',
                tier: 'free',
            });

            const response = await (0, supertest_1.default)(_index.app).post('/api/users/register').send({
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
            });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.email).toBe('test@example.com');
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
            user_1.User.create.mockRejectedValueOnce(new Error('Email already exists'));

            const response = await (0, supertest_1.default)(_index.app).post('/api/users/register').send({
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
            });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Email already exists');
        });
    });

    describe('Role-based Access Control', () => {
        beforeEach(() => {
            jsonwebtoken_1.default.verify.mockImplementation((token) => {
                if (token === 'valid_paid_user_token') {
                    return { role: 'paid' };
                } else if (token === 'valid_free_user_token') {
                    return { role: 'free' };
                } else {
                    throw new Error('Invalid token');
                }
            });
        });

        it('should allow access to paid users', async () => {
            const response = await (0, supertest_1.default)(_index.app)
                .get('/premium-content')
                .set('Authorization', 'Bearer valid_paid_user_token');

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Welcome to the premium content!');
        });

        it('should deny access to free users for premium content', async () => {
            const response = await (0, supertest_1.default)(_index.app)
                .get('/premium-content')
                .set('Authorization', 'Bearer valid_free_user_token');

            expect(response.status).toBe(403);
            expect(response.body.message).toBe('Access forbidden: Insufficient role');
        });

        it('should allow access to free content for all users', async () => {
            const response = await (0, supertest_1.default)(_index.app)
                .get('/free-content')
                .set('Authorization', 'Bearer valid_free_user_token');

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Welcome to the free content!');
        });

        it('should return an error for invalid tokens', async () => {
            const response = await (0, supertest_1.default)(_index.app)
                .get('/premium-content')
                .set('Authorization', 'Bearer invalid_token');

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Unauthorized');
        });
    });
});
