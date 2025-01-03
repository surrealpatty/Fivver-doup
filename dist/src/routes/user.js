"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the router to be used in the main app
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _user = require("../models/user");
const _authenticateToken = require("../middlewares/authenticateToken");
const _validateRegistration = require("../middlewares/validateRegistration");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Create a new router instance
const router = _express.default.Router();
// Registration endpoint
router.post('/register', _validateRegistration.validateRegistration, async (req, res)=>{
    const { email, username, password } = req.body;
    // Validate input fields
    if (!email) {
        return res.status(400).json({
            errors: [
                {
                    msg: 'Email is required'
                }
            ]
        });
    }
    if (!username) {
        return res.status(400).json({
            errors: [
                {
                    msg: 'Username is required'
                }
            ]
        });
    }
    if (!password) {
        return res.status(400).json({
            errors: [
                {
                    msg: 'Password is required'
                }
            ]
        });
    }
    try {
        // Create a new user with default values
        const user = await _user.User.create({
            email,
            username,
            password,
            role: 'user',
            tier: 'free',
            isVerified: false
        });
        return res.status(201).json(user); // Respond with the created user
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});
// Premium service route
router.get('/premium-service', _authenticateToken.authenticateToken, (req, res)=>{
    // Assume `req.user` is populated by `authenticateToken` middleware
    const user = req.user; // Cast req.user to UserPayload
    // Check if user is on a free tier
    if (user?.tier === 'free') {
        return res.status(403).json({
            message: 'Access denied. Only paid users can access this service.'
        });
    }
    // Grant access to premium users
    return res.status(200).json({
        message: 'Premium service access granted.'
    });
});
const _default = router;
