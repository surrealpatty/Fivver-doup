"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export router to use in the main app
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
        }); // Return response directly
        return; // Ensure we stop here if validation fails
    }
    try {
        const { email, username, password } = req.body;
        // Check if user already exists by email
        const existingUser = await _models.User.findOne({
            where: {
                email
            }
        });
        if (existingUser) {
            res.status(400).json({
                message: 'User already exists'
            });
            return;
        }
        // Check if username already exists
        const existingUsername = await _models.User.findOne({
            where: {
                username
            }
        });
        if (existingUsername) {
            res.status(400).json({
                message: 'Username already taken'
            });
            return;
        }
        // Hash the password before saving it
        const hashedPassword = await _bcryptjs.default.hash(password, 10);
        // Create new user
        const user = await _models.User.create({
            email,
            username,
            password: hashedPassword
        });
        // Send success response with user data
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Server error'
        });
    }
});
const _default = router;

//# sourceMappingURL=user.js.map