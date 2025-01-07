"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user"); // Import User model and UserCreationAttributes
const router = express_1.default.Router();
// Log incoming request body to debug
const logRequestBody = (req, res, next) => {
    console.log(`${req.method} request to ${req.url}:`, req.body);
    next(); // Proceed to the next middleware or route handler
};
// User Registration (Signup) Route
router.post('/signup', logRequestBody, async (req, res) => {
    const { email, username, password } = req.body;
    // Validate input
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Email, username, and password are required.' });
    }
    try {
        // Check if user already exists
        const existingUser = await user_1.User.findOne({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }
        // Hash the password using bcrypt
        const hashedPassword = await bcryptjs_1.default.hash(password, 10); // Salt rounds = 10
        // Create the new user in the database (id is handled automatically)
        const newUser = {
            email,
            username,
            password: hashedPassword,
            role: 'user', // Default role (can be modified)
            tier: 'free', // Default tier should be "free"
            isVerified: false, // Assuming user isn't verified initially
        };
        const user = await user_1.User.create(newUser); // Pass newUser as the object to create
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'your_jwt_secret', // Secret key for JWT (use environment variable)
        { expiresIn: '1h' } // Expiry time of the token
        );
        // Send back response with token
        return res.status(201).json({
            message: 'User registered successfully',
            token, // Send the generated token
        });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
// User Login Route
router.post('/login', logRequestBody, async (req, res) => {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        // Find user by email
        const user = await user_1.User.findOne({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Compare the provided password with the stored hashed password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'your_jwt_secret', // Secret key for JWT
        { expiresIn: '1h' } // Expiry time of the token
        );
        // Send back response with token
        return res.status(200).json({
            message: 'Authentication successful',
            token, // Send the generated token
        });
    }
    catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
// Export the router to use in the main app
exports.default = router;
