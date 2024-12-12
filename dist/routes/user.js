"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Import types from 'express'
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user"); // Ensure the User model is imported
const router = (0, express_1.Router)();
// Registration Route
router.post('/register', async (req, res) => {
    const { email, password, username, tier } = req.body; // Get user data from request body
    try {
        // 1. Input validation (email, password, and username are required)
        if (!email || !password || !username) {
            return res.status(400).json({ message: 'Email, password, and username are required' });
        }
        // 2. Check if the email is already in use
        const existingUser = await user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        // 3. Hash the password before saving to the database
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // 4. Create new user (with default 'free' tier if not provided)
        const newUser = await user_1.User.create({
            email,
            password: hashedPassword,
            username,
            tier: tier || 'free', // Default to 'free' if tier is not provided
            role: 'user', // Set default role to 'user'
            isVerified: false, // Default to 'false' if isVerified is not provided
        });
        // 5. Send success response
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.default = router; // Use ES module syntax for export
//# sourceMappingURL=user.js.map