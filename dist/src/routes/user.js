"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user"); // Correct relative path to the User model
const authenticateToken_1 = require("../middlewares/authenticateToken"); // Middleware for token validation
const validateRegistration_1 = require("../middlewares/validateRegistration"); // Middleware for validating registration data
// Create a new router instance
const router = express_1.default.Router();
// Registration endpoint
router.post('/register', validateRegistration_1.validateRegistration, async (req, res) => {
    const { email, username, password } = req.body;
    // Validate input fields
    if (!email) {
        return res.status(400).json({ errors: [{ msg: 'Email is required' }] });
    }
    if (!username) {
        return res.status(400).json({ errors: [{ msg: 'Username is required' }] });
    }
    if (!password) {
        return res.status(400).json({ errors: [{ msg: 'Password is required' }] });
    }
    try {
        // Create a new user with default values
        const user = await user_1.User.create({
            email,
            username,
            password,
            role: 'user', // Default role
            tier: 'free', // Default tier
            isVerified: false, // Default verification status
        });
        return res.status(201).json(user); // Respond with the created user
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Premium service route
router.get('/premium-service', authenticateToken_1.authenticateToken, (req, res) => {
    // Assume `req.user` is populated by `authenticateToken` middleware
    const user = req.user; // Cast req.user to UserPayload
    // Check if user is on a free tier
    if (user?.tier === 'free') {
        return res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
    }
    // Grant access to premium users
    return res.status(200).json({ message: 'Premium service access granted.' });
});
// Export the router to be used in the main app
exports.default = router;
