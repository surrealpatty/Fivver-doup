"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models"); // Assuming you have a Sequelize User model
const emailService_1 = require("../services/emailService"); // Import email service
const router = (0, express_1.Router)();
// User Registration Route
router.post('/register', 
// Validate user inputs
[
    (0, express_validator_1.check)('email').isEmail().withMessage('Please enter a valid email address'),
    (0, express_validator_1.check)('username').notEmpty().withMessage('Username is required'),
    (0, express_validator_1.check)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    // Check for validation errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return; // Explicit return to satisfy the TypeScript `void` requirement
    }
    try {
        const { email, username, password } = req.body;
        // Check if user already exists
        const existingUser = await models_1.User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return; // Explicit return after error response
        }
        // Hash the password before saving it
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create new user
        const user = await models_1.User.create({
            email,
            username,
            password: hashedPassword
        });
        // Optionally send a welcome email
        const emailDetails = {
            to: user.email,
            subject: 'Welcome to Our Platform!',
            text: `Hello ${user.username}, welcome to our platform. We're glad to have you!`
        };
        await (0, emailService_1.sendEmail)(emailDetails);
        // Send success response
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Test email route (useful for testing your email service)
router.get('/test-email', async (req, res) => {
    try {
        const emailDetails = {
            to: 'test@example.com',
            subject: 'Test Email',
            text: 'This is a test email sent from the email service.'
        };
        // Send test email
        await (0, emailService_1.sendEmail)(emailDetails);
        res.status(200).json({ message: 'Test email sent successfully!' });
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending test email.' });
    }
});
// Other user-related routes (e.g., login, profile update) would go here
exports.default = router;
//# sourceMappingURL=user.js.map