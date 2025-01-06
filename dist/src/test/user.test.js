"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Adjust path as needed
const user_1 = require("../models/user"); // Correct import for User model
jest.mock('../models/user', () => ({
    User: {
        create: jest.fn(),
        findOne: jest.fn(),
    },
}));
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn(),
}));
beforeAll(async () => {
    // Any database setup or mock initialization can be done here
});
describe('User Tests', () => {
    it('should register a user successfully', async () => {
        user_1.User.create.mockResolvedValueOnce({
            id: '1',
            email: 'test@example.com',
            username: 'testuser',
            isVerified: false,
            role: 'user',
            tier: 'free',
        });
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/api/users/register')
            .send({
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
});
