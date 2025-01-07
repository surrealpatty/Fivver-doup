"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _user = require("../models/user");
// Example test for user creation
describe('User creation test', ()=>{
    it('should create a new user', async ()=>{
        const newUser = await _user.User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword',
            role: 'user',
            tier: "free",
            isVerified: false
        });
        // Check if the user was created successfully
        expect(newUser).toBeDefined();
        expect(newUser.username).toBe('testuser');
        expect(newUser.email).toBe('testuser@example.com');
    });
});
