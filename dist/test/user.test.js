"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index"); // Adjust path to match the main app export
const user_1 = require("../models/user"); // Adjust path to your User model
// Set up a mock JWT secret for testing
process.env.JWT_SECRET = 'testsecret';
// Mock jwt and User model methods
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn(),
}));
jest.mock('../models/user', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));
describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reset all mocks after each test
    });
    test('should register a new user', async () => {
        // Mock findOne to simulate that the user does not already exist
        user_1.User.findOne.mockResolvedValue(null);
        // Mock create to simulate successful user creation
        user_1.User.create.mockResolvedValue({
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            password: 'hashedpassword',
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
        // Mock findOne to simulate a user with the hashed password
        user_1.User.findOne.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: hashedPassword,
        });
        const mockToken = 'mock.jwt.token';
        // Mock jwt.sign to return a test token
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
        // Mock jwt.verify to decode the token and return a mock user id
        jsonwebtoken_1.default.verify.mockReturnValue({ userId: 1 });
        const mockUser = {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
        };
        // Mock findByPk to return a user profile
        user_1.User.findByPk.mockResolvedValue(mockUser);
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`); // Corrected string interpolation
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    });
    test('should update user profile', async () => {
        const mockToken = 'mock.jwt.token';
        // Mock jwt.verify to decode the token and return a mock user id
        jsonwebtoken_1.default.verify.mockReturnValue({ userId: 1 });
        // Mock update to simulate a successful update
        user_1.User.update.mockResolvedValue([1]); // Sequelize returns [1] on successful update
        const response = await (0, supertest_1.default)(index_1.app)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`) // Corrected string interpolation
            .send({ username: 'updatedUser' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Profile updated successfully');
    });
    test('should delete user account', async () => {
        const mockToken = 'mock.jwt.token';
        // Mock jwt.verify to decode the token and return a mock user id
        jsonwebtoken_1.default.verify.mockReturnValue({ userId: 1 });
        // Mock destroy to simulate user deletion
        user_1.User.destroy.mockResolvedValue(1); // Sequelize returns 1 on successful deletion
        const response = await (0, supertest_1.default)(index_1.app)
            .delete('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`); // Corrected string interpolation
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    });
});
//# sourceMappingURL=user.test.js.map