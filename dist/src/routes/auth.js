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
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _types = require("../types");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Log incoming request body to debug
const logRequestBody = (req, res, next)=>{
    console.log(`${req.method} request to ${req.url}:`, req.body);
    next(); // Proceed to the next middleware or route handler
};
// User Registration (Signup) Route
router.post('/signup', logRequestBody, async (req, res)=>{
    const { email, username, password, role, tier } = req.body;
    // Validate input
    if (!email || !username || !password) {
        res.status(400).json({
            message: 'Email, username, and password are required.'
        });
        return;
    }
    try {
        // Check if user already exists
        const existingUser = await _user.default.findOne({
            where: {
                email
            }
        });
        if (existingUser) {
            res.status(400).json({
                message: 'Email is already in use.'
            });
            return;
        }
        // Hash the password using bcrypt
        const hashedPassword = await _bcryptjs.default.hash(password, 10); // Salt rounds = 10
        // Default values for role and tier if not provided, casting to enums
        const userRole = role || _types.UserRole.User; // Default to 'User' role
        const userTier = tier || _types.UserTier.Free; // Default to 'Free' tier
        // Create the new user in the database (id is handled automatically)
        const newUser = {
            email,
            username,
            password: hashedPassword,
            role: userRole,
            tier: userTier,
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
// User Login Route
router.post('/login', logRequestBody, async (req, res)=>{
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
        res.status(400).json({
            message: 'Email and password are required.'
        });
        return;
    }
    try {
        // Find user by email
        const user = await _user.default.findOne({
            where: {
                email
            }
        });
        if (!user) {
            res.status(401).json({
                message: 'Invalid credentials'
            });
            return;
        }
        // Compare the provided password with the stored hashed password
        const isMatch = await _bcryptjs.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({
                message: 'Invalid credentials'
            });
            return;
        }
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
        res.status(200).json({
            message: 'Authentication successful',
            token
        });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({
            message: 'Server error'
        });
    }
});
const _default = router;
