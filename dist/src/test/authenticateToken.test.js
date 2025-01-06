"use strict";
// src/test/authenticateToken.test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Import your app
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import jsonwebtoken to mock its behavior
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(() => ({ userId: 'some-user-id' })), // Mock verify to return a fake userId
}));
describe('Authentication Middleware Tests', () => {
    it('should allow access with a valid token', async () => {
        // Mock a valid JWT token
        const validToken = jsonwebtoken_1.default.sign({ userId: 'some-user-id' }, process.env.JWT_SECRET || 'secret');
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/api/protected') // Your protected route
            .set('Authorization', `Bearer ${validToken}`); // Pass the token in the Authorization header
        expect(response.status).toBe(200); // Expect the response to be 200 for valid token
        expect(jsonwebtoken_1.default.verify).toHaveBeenCalledTimes(1); // Ensure the jwt.verify was called
        expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith(validToken, process.env.JWT_SECRET || 'secret'); // Check token validation
    });
    it('should deny access with an invalid token', async () => {
        // Mock an invalid JWT token scenario
        jest.mock('jsonwebtoken', () => ({
            verify: jest.fn(() => { throw new Error('Invalid token'); }),
        }));
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/api/protected') // Your protected route
            .set('Authorization', 'Bearer invalid-token');
        expect(response.status).toBe(401); // Expect 401 Unauthorized status
        expect(response.body.message).toBe('Invalid or expired token'); // Assuming your middleware sends this message
    });
});
