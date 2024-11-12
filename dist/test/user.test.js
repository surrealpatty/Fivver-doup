"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Ensure bcryptjs is used since it's installed
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index"); // Adjust path to match your main app export (ensure you have app exported from index.ts)
const user_1 = require("../models/user"); // Import User model (ensure path is correct)
process.env.JWT_SECRET = 'testsecret'; // Mock environment variable for JWT secret
// Mock JWT methods
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn(),
}));
// Mock User model
jest.mock('../models/user', () => ({
    User: {
        findOne: jest.fn(),
        create: jest.fn(),
        findByPk: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}));
describe('User Controller', () => {
    // Clear mocks after each test
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should register a new user', async () => {
        // Mock behavior for findOne (user not found) and create (successful user creation)
        user_1.User.findOne.mockResolvedValue(null); // Simulate user not found
        user_1.User.create.mockResolvedValue({
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            password: 'hashedpassword', // Hash simulated for test
        });
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/api/users/register')
            .send({
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    });
    test('should login a user and return a token', async () => {
        const hashedPassword = await bcryptjs_1.default.hash('testpassword', 10);
        // Mock behavior for finding the user and returning hashed password
        user_1.User.findOne.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: hashedPassword,
        });
        const mockToken = 'mock.jwt.token';
        // Mock jwt sign to return the mock token
        jsonwebtoken_1.default.sign.mockReturnValue(mockToken);
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/api/users/login')
            .send({
            email: 'test@example.com',
            password: 'testpassword',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token', mockToken);
    });
    test('should return user profile', async () => {
        const mockToken = 'mock.jwt.token';
        // Mock jwt verify to decode the token and return the user id
        jsonwebtoken_1.default.verify.mockReturnValue({ userId: 1 });
        const mockUser = {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
        };
        // Mock User.findByPk to return a mock user
        user_1.User.findByPk.mockResolvedValue(mockUser);
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    });
    test('should update user profile', async () => {
        const mockToken = 'mock.jwt.token';
        // Mock jwt verify to decode the token and return the user id
        jsonwebtoken_1.default.verify.mockReturnValue({ userId: 1 });
        // Mock User.update to simulate a successful profile update
        user_1.User.update.mockResolvedValue([1]);
        const response = await (0, supertest_1.default)(index_1.app)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`)
            .send({ username: 'updatedUser' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Profile updated successfully');
    });
    test('should delete user account', async () => {
        const mockToken = 'mock.jwt.token';
        // Mock jwt verify to decode the token and return the user id
        jsonwebtoken_1.default.verify.mockReturnValue({ userId: 1 });
        // Mock User.destroy to simulate successful user deletion
        user_1.User.destroy.mockResolvedValue(1);
        const response = await (0, supertest_1.default)(index_1.app)
            .delete('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    });
});
//# sourceMappingURL=user.test.js.map