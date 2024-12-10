// src/routes/auth.ts
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
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _user = require("../models/user");
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config(); // Load environment variables from .env
const router = (0, _express.Router)();
// Login Route (for generating JWT)
router.post('/login', async (req, res)=>{
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await _user.User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }
        // Compare password with hashed password stored in the database
        const isMatch = await _bcryptjs.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials.'
            });
        }
        // Generate JWT token if credentials are valid
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            tier: user.tier
        };
        const token = _jsonwebtoken.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        }); // 1 hour expiration
        // Send the token to the client
        res.json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
});
// Protected Route Example: Access profile with JWT
router.get('/profile', authenticateJWT, (req, res)=>{
    // Access user info from the request
    const user = req.user;
    if (!user) {
        return res.status(403).json({
            message: 'Access denied. No user found.'
        });
    }
    res.json({
        message: 'Welcome to your profile',
        user
    });
});
const _default = router;

//# sourceMappingURL=auth.js.map