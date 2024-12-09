"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("@models/user"); // New lowercase import
const sequelize_1 = require("sequelize");
const express_validator_1 = require("express-validator");
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
        return; // Ensure we stop further processing
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
exports.default = router;
