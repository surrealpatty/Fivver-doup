"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user")); // Import User model and UserCreationAttributes
const types_1 = require("../types"); // Ensure the necessary types are imported
const router = (0, express_1.Router)();
// User Registration (Signup) Route
router.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;
    // Validate input
    if (!email || !username || !password) {
        res.status(400).json({ message: 'Email, username, and password are required.' });
        return; // Return to stop further code execution
    }
    try {
        // Check if user already exists
        const existingUser = await user_1.default.findOne({
            where: { email },
        });
        if (existingUser) {
            res.status(400).json({ message: 'Email is already in use.' });
            return;
        }
        // Hash the password using bcrypt
        const hashedPassword = await bcryptjs_1.default.hash(password, 10); // Salt rounds = 10
        // Create the new user in the database (id is handled automatically)
        const newUser = {
            email,
            username,
            password: hashedPassword,
            role: types_1.UserRole.User, // Use the UserRole enum
            tier: types_1.UserTier.Free, // Use the UserTier enum
            isVerified: false, // Assuming user isn't verified initially
        };
        const user = await user_1.default.create(newUser); // Pass newUser as the object to create
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'your_jwt_secret', // Secret key for JWT (use environment variable)
        { expiresIn: '1h' } // Expiry time of the token
        );
        // Send back response with token
        res.status(201).json({
            message: 'User registered successfully',
            token, // Send the generated token
        });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// User Login Route (Optional, just as an example)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required.' });
        return; // Return to stop further code execution
    }
    try {
        const user = await user_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Invalid email or password.' });
            return;
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid email or password.' });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful',
            token, // Send the generated token
        });
    }
    catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Export router to be used in the main app
exports.default = router;
