// src/test/jwt.test.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _jwt = require("../utils/jwt");
// Example user object with the correct properties
const user = {
    id: '123',
    email: 'user@example.com',
    username: 'username',
    tier: 'paid',
    role: 'user'
};
describe('JWT Token Generation and Verification', ()=>{
    it('should generate and verify a JWT token correctly', ()=>{
        // Generate token
        const token = (0, _jwt.generateToken)(user);
        console.log('Generated Token:', token);
        // Verify the token
        const decoded = (0, _jwt.verifyToken)(token);
        console.log('Decoded User:', decoded);
        // Assert that the decoded token matches the user information
        if (decoded) {
            expect(decoded.id).toBe(user.id);
            expect(decoded.email).toBe(user.email);
            expect(decoded.username).toBe(user.username);
            expect(decoded.tier).toBe(user.tier);
            expect(decoded.role).toBe(user.role);
        } else {
            fail('Token verification failed'); // Fail the test if the token could not be decoded
        }
    });
});
