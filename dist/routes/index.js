"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user"); // Ensure you're importing the User model
const passwordReset_1 = __importDefault(require("./passwordReset")); // Import the password reset routes
const profile_1 = __importDefault(require("./profile")); // Import profile routes
const router = (0, express_1.Router)();
// Register route
router.post('/register', async (req, res) => {
    const { email, password, username, tier } = req.body;
    // Check if the required fields are provided
    if (!email || !password || !username || !tier) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        // You can add default values or pass additional values for 'role' and 'isVerified' if needed
        const newUser = await user_1.User.create({
            id: uuidv4(), // Add the 'id' property
            email,
            username,
            password: hashedPassword,
            role: '',
            tier: '',
            isVerified: false,
        });
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                email: newUser.email,
                username: newUser.username,
                tier: newUser.tier
            }
        });
    }
    catch (error) {
        // Fix the 'unknown' type error by typing it as 'Error'
        if (error instanceof Error) {
            console.error(error.message); // Access the message property of Error
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
        // Handle unexpected error types
        return res.status(500).json({ message: 'Server error', error: 'Unknown error' });
    }
});
// Include other routes (e.g., password reset, profile)
router.use('/password-reset', passwordReset_1.default); // Add password reset routes
router.use('/profile', profile_1.default); // Add profile routes
// Export the router to be used in the main application
exports.default = router;
//# sourceMappingURL=index.js.map