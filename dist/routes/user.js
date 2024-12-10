"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/user.ts
const express_1 = require("express"); // Import necessary types
const user_1 = require("@models/user"); // Correct import for User model
const express_validator_1 = require("express-validator"); // Express validation middleware
const sequelize_1 = require("sequelize"); // Import Sequelize 'Op' for the OR condition
const router = (0, express_1.Router)();
router.post('/register', 
// Validation middleware for email, username, and password
(0, express_validator_1.body)('email').isEmail().withMessage('Invalid email address'), (0, express_validator_1.body)('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'), (0, express_validator_1.body)('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'), 
// Handle user registration logic
async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { email, username, password } = req.body;
    try {
        // Check if user already exists by email or username
        const existingUser = await user_1.User.findOne({
            where: { [sequelize_1.Op.or]: [{ email }, { username }] }, // Check both email and username
        });
        if (existingUser) {
            res.status(400).json({ message: 'Email or Username already in use' });
            return;
        }
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = await user_1.User.create({
            email,
            username,
            password: hashedPassword,
            role: 'free', // Default to free tier if needed
            tier: 'free',
        });
    }
    finally {
    }
}); // Default tier (can be updated
