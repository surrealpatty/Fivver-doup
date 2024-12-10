"use strict";
// src/routes/user.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Import necessary types
const user_1 = require("@models/user"); // Correct import for User model
const sequelize_1 = require("sequelize"); // Import ValidationError for handling Sequelize errors
const express_validator_1 = require("express-validator"); // Express validation middleware
const sequelize_2 = require("sequelize"); // Import Sequelize 'Op' for the OR condition
const router = (0, express_1.Router)();
// Route for user registration
router.post('/register', 
// Validation middleware for email, username, and password
(0, express_validator_1.body)('email').isEmail().withMessage('Invalid email address'), (0, express_validator_1.body)('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'), (0, express_validator_1.body)('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'), 
// Handle user registration logic
async (req, res) => {
    // Check for validation errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return; // Ensure we stop further processing if validation fails
    }
    const { email, username, password } = req.body;
    try {
        // Check if user already exists by email or username
        const existingUser = await user_1.User.findOne({
            where: { [sequelize_2.Op.or]: [{ email }, { username }] }, // Use Sequelize's 'Op' to check both fields
        });
        if (existingUser) {
            res.status(400).json({ message: 'Email or Username already in use' });
            return; // Ensure we stop further processing if the user already exists
        }
        // Hash password before saving
        const hashedPassword = await user_1.User.hashPassword(password);
        // Create a new user
        const newUser = await user_1.User.create({
            email,
            username,
            password: hashedPassword,
            role: 'free', // Default to free tier if needed
            tier: 'free', // Default tier (can be updated later if paid)
        });
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                role: newUser.role,
                tier: newUser.tier,
            },
        });
    }
    catch (error) {
        if (error instanceof sequelize_1.ValidationError) {
            res.status(400).json({ errors: error.errors });
        }
        else {
            res.status(500).json({ message: 'Server error' });
        }
    }
});
// Route for accessing premium content (tier-based restrictions)
router.get('/premium-content', authenticateJWT, async (req, res) => {
    const userId = req.user?.id; // Ensure the user is retrieved from the token
    try {
        const user = await user_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Check if the user is on the 'paid' tier
        if (user.tier !== 'paid') {
            res.status(403).json({ message: 'Access restricted to paid users only' });
            return;
        }
        res.status(200).json({ message: 'Welcome to premium content' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
