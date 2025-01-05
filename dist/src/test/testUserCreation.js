"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user")); // Ensure the path is correct
// Example test for user creation
describe('User creation test', () => {
    it('should create a new user', async () => {
        const newUser = await user_1.default.create({
            username: 'testuser', // Change this to your test username
            email: 'testuser@example.com', // Ensure this email is valid
            password: 'testpassword', // Make sure this matches your model's requirements
            role: 'user', // Add default role value
            tier: "free", // Default tier should be "free"
            isVerified: false, // Add default verification status
        });
        // Check if the user was created successfully
        expect(newUser).toBeDefined();
        expect(newUser.username).toBe('testuser');
        expect(newUser.email).toBe('testuser@example.com');
    });
});
