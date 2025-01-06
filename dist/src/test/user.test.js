"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Ensure the path to your app is correct
const user_1 = require("../models/user"); // Correct import for the User model
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
    // Any database setup or mock initialization can be done here, such as Sequelize model sync
    // If you are using Sequelize, ensure models are synced with the database before running tests
    // Example:
    // await sequelize.sync({ force: true }); // Uncomment and ensure sequelize is imported correctly
});
describe('User Tests', () => {
    it('should register a user successfully', async () => {
        // Mocking Sequelize's create method
        user_1.User.create.mockResolvedValueOnce({
            id: '1', // UUID should be returned here
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
        // Test that the response status is correct
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.email).toBe('test@example.com');
        // Ensure that the `User.create` method was called with the correct parameters
        expect(user_1.User.create).toHaveBeenCalledWith({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
            isVerified: false,
            role: 'user',
            tier: 'free',
        });
    });
    // You can add more test cases for other functionalities here
});
