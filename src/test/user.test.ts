"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user"); // Ensure correct import path for dist
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Ensure correct import path for dist
// Mock the User model
jest.mock('../models/user');
// Mock jwt module if necessary
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mockedToken'), // Mock token signing function
    verify: jest.fn(() => ({ userId: 1 })), // Mock token verification function
}));
describe('User Controller', () => {
    beforeAll(() => {
        // Mock necessary User model methods
        user_1.User.findOne.mockResolvedValue(null); // Mock for registration (user not found)
        user_1.User.create.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',
        }); // Mock for user creation
        user_1.User.findByPk.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
        }); // Mock for finding user profile
        user_1.User.update.mockResolvedValue([1]); // Mock for updating user profile
        user_1.User.destroy.mockResolvedValue(1); // Mock for deleting user profile
    });

    afterAll(() => {
        jest.clearAllMocks(); // Clear all mocks after tests
    });

    test('should register a new user', async () => {
        const response = await supertest_1.default(index_1.app)
            .post('/api/users/register') // Adjust the endpoint according to your route
            .send({
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.status).toBe(201); // Ensure the response status is 201 (Created)
        expect(response.body).toHaveProperty('id', 1); // Ensure the response contains the user ID
        expect(response.body).toHaveProperty('email', 'test@example.com'); // Ensure the response contains the email
    });

    test('should login a user and return a token', async () => {
        const response = await supertest_1.default(index_1.app)
            .post('/api/users/login') // Adjust the endpoint according to your route
            .send({
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.status).toBe(200); // Ensure the response status is 200 (OK)
        expect(response.body).toHaveProperty('token', 'mockedToken'); // Ensure the response contains the mocked token
    });

    test('should return user profile', async () => {
        const response = await supertest_1.default(index_1.app)
            .get('/api/users/profile')
            .set('Authorization', 'Bearer mockedToken'); // Use mocked token for auth
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('email', 'test@example.com');
    });

    test('should update user profile', async () => {
        const response = await supertest_1.default(index_1.app)
            .put('/api/users/profile')
            .set('Authorization', 'Bearer mockedToken')
            .send({
                email: 'updated@example.com',
                password: 'newpassword123',
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('email', 'updated@example.com');
    });

    test('should delete user account', async () => {
        const response = await supertest_1.default(index_1.app)
            .delete('/api/users/profile')
            .set('Authorization', 'Bearer mockedToken');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    });
});
