// src/test/app.test.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _user = require("../models/user");
describe('User Creation Tests', ()=>{
    it('should create a user successfully', async ()=>{
        const user = await _user.User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
            role: 'user',
            tier: '1',
            isVerified: false // Add isVerified (default or specific value)
        });
        // Check that the user is created correctly
        expect(user).toBeDefined();
        expect(user.username).toBe('testuser');
        expect(user.email).toBe('test@example.com');
        expect(user.password).toBe('testpassword');
        expect(user.role).toBe('user');
        expect(user.tier).toBe('1'); // Expect '1' as a string
        expect(user.isVerified).toBe(false);
    });
});

//# sourceMappingURL=app.test.js.map