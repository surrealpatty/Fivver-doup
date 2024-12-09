"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Ensure you're importing your Express app
// Mocking the User model to mock the create function for testing
const user_1 = require("../models/user");
jest.mock('../models/user', () => ({
    User: {
        create: jest.fn(),
    },
}));
describe('POST /register', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test to avoid conflicts
    });
    it('should register a new user successfully', async () => {
        // Mock the User.create method
        user_1.User.create.mockResolvedValueOnce({
            id: '1',
            email: 'newuser@example.com',
            username: 'newuser',
            password: 'password123',
        });
        // Send request to the /register route
        const res = await (0, supertest_1.default)(index_1.app)
            .post('/register')
            .send({
            email: 'newuser@example.com',
            username: 'newuser',
            password: 'password123',
        });
        // Assertions
        expect(res.status).toBe(201); // Expect HTTP 201 (Created)
        expect(res.body.message).toBe('User registered successfully'); // Response message
        expect(res.body.user).toEqual({
            id: '1',
            email: 'newuser@example.com',
            username: 'newuser',
            password: 'password123', // Ensure the mocked password is correct
        });
    });
    it('should return an error if email or username is already in use', async () => {
        // Mock the User.create method to simulate an existing user
        user_1.User.create.mockRejectedValueOnce(new Error('User already exists'));
        const res = await (0, supertest_1.default)(index_1.app)
            .post('/register')
            .send({
            email: 'existinguser@example.com',
            username: 'existinguser',
            password: 'password123',
        });
        // Assertions
        expect(res.status).toBe(400); // Expect HTTP 400 (Bad Request)
        expect(res.body.message).toBe('Email or Username already in use');
    });
    it('should return a validation error for invalid email', async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .post('/register')
            .send({
            email: 'invalid-email',
            username: 'newuser',
            password: 'password123',
        });
        // Assertions
        expect(res.status).toBe(400); // Expect HTTP 400 (Bad Request)
        expect(res.body.errors[0].msg).toBe('Invalid email address'); // Validation error message
    });
    it('should return a validation error for missing username', async () => {
        const res = await (0, supertest_1.default)(index_1.app)
            .post('/register')
            .send({
            email: 'newuser@example.com',
            password: 'password123',
        });
        // Assertions
        expect(res.status).toBe(400); // Expect HTTP 400 (Bad Request)
        expect(res.body.errors[0].msg).toBe('Username must be between 3 and 20 characters'); // Username error
    });
});
