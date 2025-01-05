"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Ensure Sequelize decorators work properly
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // For mocking token validation
const index_1 = require("../index"); // Corrected import to point to src/ index
const user_1 = require("../models/user"); // User model import
// Mocking the User model and JWT methods for testing
jest.mock('src/models/user', () => ({
    User: {
        create: jest.fn(),
        findOne: jest.fn(),
    },
}));
// Mocking JWT methods for testing
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
    sign: jest.fn(), // Mock the sign method if needed
}));
describe('User Tests', () => {
    // Test: Successful user registration
    it('should register a user successfully', async () => {
        // Mock resolved value for User.create
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
    // Test: Registration failure due to missing required data
    it('should fail with missing data', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/api/users/register')
            .send({
            email: 'test@example.com',
            // No password field to simulate an error
        });
        expect(response.status).toBe(400); // Expecting a 400 Bad Request status
        expect(response.body).toHaveProperty('error', 'Password is required');
    });
    // Test: Error when email already exists
    it('should return an error if email is already taken', async () => {
        user_1.User.create.mockRejectedValueOnce(new Error('Email already exists'));
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/api/users/register')
            .send({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
        });
        expect(response.status).toBe(400); // Expecting a 400 Bad Request status
        expect(response.body).toHaveProperty('error', 'Email already exists');
    });
    // Test: Access control based on JWT roles (Example for premium content access)
    describe('Role-based Access Control', () => {
        beforeEach(() => {
            // Mock the jwt.verify method to return specific user roles
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
        // Test: Paid users can access premium content
        it('should allow access to premium content for paid users', async () => {
            const response = await (0, supertest_1.default)(index_1.app)
                .get('/premium-content')
                .set('Authorization', 'Bearer valid_paid_user_token');
            expect(response.status).toBe(200); // Expecting a 200 OK status
            expect(response.body.message).toBe('Welcome to the premium content!');
        });
        // Test: Free users cannot access premium content
        it('should deny access to free users for premium content', async () => {
            const response = await (0, supertest_1.default)(index_1.app)
                .get('/premium-content')
                .set('Authorization', 'Bearer valid_free_user_token');
            expect(response.status).toBe(403); // Expecting a 403 Forbidden status
            expect(response.body.message).toBe('Access forbidden: Insufficient role');
        });
        // Test: Free users can access free content
        it('should allow access to free content for all users', async () => {
            const response = await (0, supertest_1.default)(index_1.app)
                .get('/free-content')
                .set('Authorization', 'Bearer valid_free_user_token');
            expect(response.status).toBe(200); // Expecting a 200 OK status
            expect(response.body.message).toBe('Welcome to the free content!');
        });
        // Test: Invalid token access should result in an error
        it('should return an error for invalid tokens', async () => {
            const response = await (0, supertest_1.default)(index_1.app)
                .get('/premium-content')
                .set('Authorization', 'Bearer invalid_token');
            expect(response.status).toBe(401); // Expecting a 401 Unauthorized status
            expect(response.body.message).toBe('Unauthorized');
        });
    });
    // Test: Token verification in a protected route
    describe('Token Verification in Protected Routes', () => {
        it('should return user data when token is valid', async () => {
            const token = 'valid-token'; // Replace with an actual valid token string for testing
            const response = await (0, supertest_1.default)(index_1.app)
                .get('/protected-route') // The route protected by authenticateToken
                .set('Authorization', `Bearer ${token}`); // Set the Authorization header
            expect(response.status).toBe(200);
            expect(response.body.user).toHaveProperty('id'); // Ensure user data is in the response
        });
        it('should return 403 if token is invalid', async () => {
            const token = 'invalid-token';
            const response = await (0, supertest_1.default)(index_1.app)
                .get('/protected-route')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(403); // Ensure it returns 403 for invalid token
            expect(response.body.message).toBe('Invalid or expired token');
        });
    });
});
