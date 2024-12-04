"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models"); // Ensure correct path to your User model
const router = (0, express_1.Router)();
// User Registration Route
router.post('/register', 
// Validate user inputs
[
    (0, express_validator_1.check)('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    (0, express_validator_1.check)('username')
        .notEmpty()
        .withMessage('Username is required'),
    (0, express_validator_1.check)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
], 
// Define the route handler with a return type of void
async (req, res) => {
    // Check for validation errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return; // Ensure we stop here if validation fails
    }
    try {
        const { email, username, password } = req.body;
        // Check if user already exists by email
        const existingUser = await models_1.User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return; // Stop execution if user exists
        }
        // Check if username already exists
        const existingUsername = await models_1.User.findOne({ where: { username } });
        if (existingUsername) {
            res.status(400).json({ message: 'Username already taken' });
            return; // Stop execution if username exists
        }
        // Hash the password before saving it
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create new user
        const user = await models_1.User.create({
            email,
            username,
            password: hashedPassword
        });
        // Send success response with user data
        res.status(201).json({
            message: 'User created successfully',
            user: { id: user.id, username: user.username, email: user.email }
        });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Export router to use in the main app
exports.default = router;
//# sourceMappingURL=user.js.map