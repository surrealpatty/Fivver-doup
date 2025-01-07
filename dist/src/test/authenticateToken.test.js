"use strict";
// src/test/authenticateToken.test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Ensure this is the correct path to your app
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import jsonwebtoken to mock its behavior
// Mock jsonwebtoken methods
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mocked-token'), // Mock the sign method
    verify: jest.fn(() => ({ userId: 'some-user-id' })), // Mock the verify method to return a fake payload
}));
describe('Authentication Middleware Tests', () => {
    const secret = process.env.JWT_SECRET || 'secret';
    it('should allow access with a valid token', async () => {
        const validToken = jsonwebtoken_1.default.sign({ userId: 'some-user-id' }, secret); // Use the mocked sign function
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/api/protected') // Replace with your actual protected route
            .set('Authorization', `Bearer ${validToken}`); // Add the mocked token in the Authorization header
        expect(response.status).toBe(200); // Expect 200 status for valid token
        expect(jsonwebtoken_1.default.verify).toHaveBeenCalledTimes(1); // Ensure jwt.verify was called
        expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith(validToken, secret); // Ensure jwt.verify was called with the correct arguments
    });
    it('should deny access with an invalid token', async () => {
        // Update the mock for the verify method to throw an error
        jsonwebtoken_1.default.verify.mockImplementationOnce(() => {
            throw new Error('Invalid token');
        });
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/api/protected') // Replace with your actual protected route
            .set('Authorization', 'Bearer invalid-token'); // Use an invalid token
        expect(response.status).toBe(401); // Expect 401 Unauthorized status
        expect(response.body.message).toBe('Invalid or expired token'); // Check for the correct error message
    });
});
