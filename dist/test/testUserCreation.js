"use strict";
// src/test/testUserCreation.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user")); // Ensure the path is correct
const types_1 = require("../types"); // Import enums for role and tier
// Example test for user creation
describe('User creation test', () => {
    it('should create a new user', async () => {
        // Create a new user instance using the enums for role and tier
        const newUser = await user_1.default.create({
            username: 'testuser', // Test username
            email: 'testuser@example.com', // Valid test email
            password: 'testpassword', // Ensure this matches your model's requirements
            role: types_1.UserRole.User, // Use UserRole enum for type safety
            tier: types_1.UserTier.Free, // Use UserTier enum for default tier
            isVerified: false, // Default verification status
        });
        // Check if the user was created successfully
        expect(newUser).toBeDefined();
        expect(newUser.username).toBe('testuser');
        expect(newUser.email).toBe('testuser@example.com');
        expect(newUser.role).toBe(types_1.UserRole.User); // Verify the role is correctly assigned
        expect(newUser.tier).toBe(types_1.UserTier.Free); // Verify the tier is correctly assigned
    });
});
