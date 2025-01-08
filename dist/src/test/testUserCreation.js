// src/test/testUserCreation.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _user = require("../models/user");
const _types = require("../types");
// Example test for user creation
describe('User creation test', ()=>{
    it('should create a new user', async ()=>{
        // Create a new user instance using the enums for role and tier
        const newUser = await _user.User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword',
            role: _types.UserRole.User,
            tier: _types.UserTier.Free,
            isVerified: false
        });
        // Check if the user was created successfully
        expect(newUser).toBeDefined();
        expect(newUser.username).toBe('testuser');
        expect(newUser.email).toBe('testuser@example.com');
        expect(newUser.role).toBe(_types.UserRole.User); // Verify the role is correctly assigned
        expect(newUser.tier).toBe(_types.UserTier.Free); // Verify the tier is correctly assigned
    });
});
