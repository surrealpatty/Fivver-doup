"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user")); // Import UserAttributes from the correct file
const express_validator_1 = require("express-validator");
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
// User registration route
router.post('/register', 
// Validation middleware
(0, express_validator_1.body)('username').isString().notEmpty().withMessage('Username is required'), (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email format'), (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'), (0, express_validator_1.body)('firstName').optional().isString().withMessage('First name must be a string'), (0, express_validator_1.body)('lastName').optional().isString().withMessage('Last name must be a string'), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Destructure and typecast to RegisterUserRequest
    const { username, email, password, firstName = '', lastName = '' } = req.body;
    try {
        // Check if username or email already exists
        const existingUser = await user_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [{ username }, { email }]
            }
        });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ message: 'Username already taken' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email is already taken' });
            }
        }
        // Hash the password before saving
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create the user with the correct type for Sequelize
        const user = await user_1.default.create({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: 'Free', // Default role for a new user
            subscriptionStatus: 'Inactive', // Default subscription status
        }); // Typecast to UserAttributes to match the expected type
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