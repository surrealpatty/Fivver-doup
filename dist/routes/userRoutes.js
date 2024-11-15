"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs")); // bcryptjs is compatible with both Node.js and TypeScript
const user_1 = __importDefault(require("../models/user")); // Import your User model (make sure it’s the correct path)
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
// User registration route
router.post('/register', [
    // Validation middleware
    (0, express_validator_1.body)('username').isString().notEmpty().withMessage('Username is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('firstName').isString().notEmpty().withMessage('First name is required'),
    (0, express_validator_1.body)('lastName').isString().notEmpty().withMessage('Last name is required'),
], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        // Return validation errors in a structured format
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password, firstName, lastName } = req.body;
    try {
        // Check if username already exists
        const existingUser = await user_1.default.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        }
        // Check if email already exists
        const existingEmail = await user_1.default.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already taken' });
        }
        // Hash the password with a salt round of 10
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create the user
        const user = await user_1.default.create({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: 'Free', // Set the default role to "Free"
            subscriptionStatus: 'Inactive', // Set the default subscription status
        });
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
//# sourceMappingURL=userRoutes.js.map