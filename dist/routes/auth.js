"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs")); // For password hashing
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user"); // Correct path to the User model
const authenticateToken_1 = require("../middlewares/authenticateToken"); // Correct middleware
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env
const router = (0, express_1.Router)();
// Register Route
router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        // Hash the password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create a new user with default values for role, tier, and isVerified
        const newUser = await user_1.User.create({
            email,
            username,
            password: hashedPassword,
            role: 'user', // Default role
            tier: 'free', // Default tier
            isVerified: false, // Default verification status
        });
        // Respond with success
        res.status(201).json({ message: 'User registered successfully.', user: newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Login Route (for generating JWT)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        // Compare password with hashed password stored in the database
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        // Generate JWT token if credentials are valid
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            tier: user.tier,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // 1 hour expiration
        // Send the token to the client
        res.json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Protected Route Example: Access profile with JWT
router.get('/profile', authenticateToken_1.authenticateToken, (req, res) => {
    // Access user info from the request
    const user = req.user;
    if (!user) {
        return res.status(403).json({ message: 'Access denied. No user found.' });
    }
    res.json({ message: 'Welcome to your profile', user });
});
// Export router to use in the main app
exports.default = router;
//# sourceMappingURL=auth.js.map