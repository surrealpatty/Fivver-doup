"use strict";
// src/test/jwt.test.ts
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt"); // Adjust the import path if necessary
// Example user object with the correct properties
const user = {
    id: '123',
    email: 'user@example.com',
    username: 'username',
    tier: 'paid',
    role: 'user',
};
describe('JWT Token Generation and Verification', () => {
    it('should generate and verify a JWT token correctly', () => {
        // Generate token
        const token = (0, jwt_1.generateToken)(user);
        console.log('Generated Token:', token);
        // Verify the token
        const decoded = (0, jwt_1.verifyToken)(token);
        console.log('Decoded User:', decoded);
        // Assert that the decoded token matches the user information
        if (decoded) {
            expect(decoded.id).toBe(user.id);
            expect(decoded.email).toBe(user.email);
            expect(decoded.username).toBe(user.username);
            expect(decoded.tier).toBe(user.tier);
            expect(decoded.role).toBe(user.role);
        }
        else {
            fail('Token verification failed'); // Fail the test if the token could not be decoded
        }
    });
});
