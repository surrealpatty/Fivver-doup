"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Import types from 'express'
const bcryptjs_1 = __importDefault(require("bcryptjs")); // For password hashing
const user_1 = require("../models/user"); // Ensure the User model path is correct
const router = (0, express_1.Router)();
// POST /api/users/register - User Registration Route
router.post('/register', async (req, res) => {
    const { email, password, username, tier } = req.body; // Extract user input
    try {
        // 1. Validate required fields
        if (!email || !password || !username) {
            return res.status(400).json({ message: 'Email, password, and username are required' });
        }
        // 2. Check if the email already exists
        const existingUser = await user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }
        // 3. Hash the password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // 4. Create a new user
        const newUser = await user_1.User.create({
            email,
            password: hashedPassword,
            username,
            tier: tier || 'free', // Default tier is 'free'
            role: 'user', // Default role is 'user'
            isVerified: false, // Default to false
        });
        // 5. Return success response
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                tier: newUser.tier,
            },
        });
    }
    catch (error) {
        console.error('Error registering user:', error); // Log error to the console
        return res.status(500).json({ message: 'Server error', error });
    }
});
// GET /api/users/create-user - Debugging Route (Manually Create User)
router.get('/create-user', async (req, res) => {
    try {
        // Manually create a test user
        const newUser = await user_1.User.create({
            email: 'test@example.com',
            username: 'testuser',
            password: await bcryptjs_1.default.hash('password123', 10), // Hash the password
            tier: 'free',
            role: 'user',
            isVerified: false,
        });
        console.log('Test user created:', newUser); // Debug log
        return res.status(201).json({
            message: 'Test user created successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                tier: newUser.tier,
            },
        });
    }
    catch (error) {
        console.error('Error creating test user:', error); // Log error to the console
        return res.status(500).json({ message: 'Server error', error });
    }
});
// Export the router for use in the app
exports.default = router;
//# sourceMappingURL=user.js.map