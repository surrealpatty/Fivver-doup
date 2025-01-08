"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export router to be used in the main app
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _user = require("../models/user");
const _types = require("../types");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = (0, _express.Router)();
// User Registration (Signup) Route
router.post('/signup', async (req, res)=>{
    const { email, username, password } = req.body;
    // Validate input
    if (!email || !username || !password) {
        return res.status(400).json({
            message: 'Email, username, and password are required.'
        });
    }
    try {
        // Check if user already exists
        const existingUser = await _user.User.findOne({
            where: {
                email
            }
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'Email is already in use.'
            });
        }
        // Hash the password using bcrypt
        const hashedPassword = await _bcryptjs.default.hash(password, 10); // Salt rounds = 10
        // Create the new user in the database (id is handled automatically)
        const newUser = {
            email,
            username,
            password: hashedPassword,
            role: _types.UserRole.User,
            tier: _types.UserTier.Free,
            isVerified: false
        };
        const user = await _user.User.create(newUser); // Pass newUser as the object to create
        // Generate JWT token
        const token = _jsonwebtoken.default.sign({
            userId: user.id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET || 'your_jwt_secret', {
            expiresIn: '1h'
        } // Expiry time of the token
        );
        // Send back response with token
        return res.status(201).json({
            message: 'User registered successfully',
            token
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({
            message: 'Server error'
        });
    }
});
// User Login Route (Optional, just as an example)
router.post('/login', async (req, res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required.'
        });
    }
    try {
        const user = await _user.User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password.'
            });
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await _bcryptjs.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid email or password.'
            });
        }
        // Generate JWT token
        const token = _jsonwebtoken.default.sign({
            userId: user.id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET || 'your_jwt_secret', {
            expiresIn: '1h'
        });
        return res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).json({
            message: 'Server error'
        });
    }
});
const _default = router;
