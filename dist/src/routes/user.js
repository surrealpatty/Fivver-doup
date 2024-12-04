"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Other user-related routes (e.g., login, profile update) would go here
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _expressvalidator = require("express-validator");
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _models = require("../models");
const _emailService = require("../services/emailService");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = (0, _express.Router)();
// User Registration Route
router.post('/register', // Validate user inputs
[
    (0, _expressvalidator.check)('email').isEmail().withMessage('Please enter a valid email address'),
    (0, _expressvalidator.check)('username').notEmpty().withMessage('Username is required'),
    (0, _expressvalidator.check)('password').isLength({
        min: 6
    }).withMessage('Password must be at least 6 characters long')
], async (req, res)=>{
    // Check for validation errors
    const errors = (0, _expressvalidator.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        });
        return; // Explicit return to satisfy the TypeScript `void` requirement
    }
    try {
        const { email, username, password } = req.body;
        // Check if user already exists
        const existingUser = await _models.User.findOne({
            where: {
                email
            }
        });
        if (existingUser) {
            res.status(400).json({
                message: 'User already exists'
            });
            return; // Explicit return after error response
        }
        // Hash the password before saving it
        const hashedPassword = await _bcryptjs.default.hash(password, 10);
        // Create new user
        const user = await _models.User.create({
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
        await (0, _emailService.sendEmail)(emailDetails);
        // Send success response
        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
});
// Test email route (useful for testing your email service)
router.get('/test-email', async (req, res)=>{
    try {
        const emailDetails = {
            to: 'test@example.com',
            subject: 'Test Email',
            text: 'This is a test email sent from the email service.'
        };
        // Send test email
        await (0, _emailService.sendEmail)(emailDetails);
        res.status(200).json({
            message: 'Test email sent successfully!'
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            message: 'Error sending test email.'
        });
    }
});
const _default = router;

//# sourceMappingURL=user.js.map