"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the router to use in the main app
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
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
        const existingUser = await _user.default.findOne({
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
            role: 'user',
            tier: 'free',
            isVerified: false
        };
        const user = await _user.default.create(newUser); // Pass newUser as the object to create
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
        res.status(201).json({
            message: 'User registered successfully',
            token
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({
            message: 'Server error'
        });
    }
});
const _default = router;

//# sourceMappingURL=auth.js.map