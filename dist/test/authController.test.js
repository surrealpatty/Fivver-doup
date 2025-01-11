"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controllers/authController"); // Adjust to your actual controller import
const jwt_1 = require("../utils/jwt");
const user_1 = __importDefault(require("../models/user")); // Assuming the User model is imported from this path
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Mocking dependencies
jest.mock('../utils/jwt', () => ({
    generateToken: jest.fn(),
}));
jest.mock('../models/user', () => ({
    User: {
        findOne: jest.fn(),
    },
}));
describe('Auth Controller Tests', () => {
    const mockRequest = (body) => ({
        body,
    }); // This creates a mock request object
    const mockResponse = () => {
        const res = {}; // Mocking the response object
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        return res;
    };
    describe('POST /auth/login', () => {
        it('should authenticate a user and return a token for valid credentials', async () => {
            const req = mockRequest({
                email: 'test@example.com',
                password: 'testpassword',
            });
            const res = mockResponse();
            // Mocking the user response from the database
            const mockUser = {
                id: '1',
                email: 'test@example.com',
                username: 'testuser',
                password: await bcryptjs_1.default.hash('testpassword', 10), // bcrypt hash for "testpassword"
                tier: 'free',
                role: 'user',
            };
            // Mocking User.findOne to return the mock user
            user_1.default.findOne.mockResolvedValue(mockUser);
            const mockToken = 'mock-token';
            jwt_1.generateToken.mockReturnValue(mockToken);
            await (0, authController_1.authenticateUser)(req, res);
            expect(jwt_1.generateToken).toHaveBeenCalledWith({
                id: '1',
                email: 'test@example.com',
                username: 'testuser',
                tier: 'free',
                role: 'user',
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Authentication successful',
                token: mockToken,
            });
        });
        it('should return 401 for invalid email', async () => {
            const req = mockRequest({
                email: 'wrong@example.com',
                password: 'wrongpassword',
            });
            const res = mockResponse();
            // Simulating user not found
            user_1.default.findOne.mockResolvedValue(null);
            await (0, authController_1.authenticateUser)(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
        });
        it('should return 401 for incorrect password', async () => {
            const req = mockRequest({
                email: 'test@example.com',
                password: 'wrongpassword',
            });
            const res = mockResponse();
            // Simulating user found, but password doesn't match
            const mockUser = {
                id: '1',
                email: 'test@example.com',
                username: 'testuser',
                password: await bcryptjs_1.default.hash('testpassword', 10), // bcrypt hash for "testpassword"
                tier: 'free',
                role: 'user',
            };
            user_1.default.findOne.mockResolvedValue(mockUser);
            await (0, authController_1.authenticateUser)(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
        });
    });
});
