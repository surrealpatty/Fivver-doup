"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user"); // Importing User model
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
// User registration route
router.post('/register', 
// Validation middleware
(0, express_validator_1.body)('username').isString().notEmpty().withMessage('Username is required'), (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email format'), (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'), (0, express_validator_1.body)('firstName').isString().notEmpty().withMessage('First name is required'), (0, express_validator_1.body)('lastName').isString().notEmpty().withMessage('Last name is required'), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password, firstName, lastName } = req.body;
    try {
        // Check if username already exists
        const existingUser = await user_1.User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        // Check if email already exists
        const existingEmail = await user_1.User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already taken' });
        }
        // Hash the password before saving it
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create the user with necessary fields
        const user = await user_1.User.create({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: 'Free', // Default role for a new user
            subscriptionStatus: 'Inactive', // Default subscription status
        }); // Ensure this matches the User model's attributes
        // Respond with the created user data (excluding password)
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            subscriptionStatus: user.subscriptionStatus,
        });
    }
    catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map