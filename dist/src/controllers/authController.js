"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    loginUser: function() {
        return loginUser;
    },
    registerUser: function() {
        return registerUser;
    }
});
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _uuid = require("uuid");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
const registerUser = async (req, res)=>{
    const { email, username, password } = req.body;
    try {
        // Input validation
        if (!email || !username || !password) {
            return res.status(400).json({
                message: 'Please provide all fields'
            });
        }
        // Check if user already exists
        const existingUser = await _user.default.findOne({
            where: {
                email
            }
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }
        // Hash the password before saving it
        const hashedPassword = await _bcryptjs.default.hash(password, 10);
        // Create a new user 
        const user = await _user.default.create({
            id: (0, _uuid.v4)(),
            email,
            username,
            password: hashedPassword,
            role: 'user',
            tier: 'free',
            isVerified: false
        });
        // Generate JWT token after user registration
        const token = _jsonwebtoken.default.sign({
            id: user.id,
            email: user.email,
            username: user.username,
            tier: user.tier
        }, SECRET_KEY, {
            expiresIn: '1h'
        });
        // Return response with user details and token
        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            },
            token
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({
            message: 'Server error during user registration'
        });
    }
};
const loginUser = async (req, res)=>{
    const { email, password } = req.body;
    try {
        // Input validation
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide email and password'
            });
        }
        // Check if user exists
        const user = await _user.default.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }
        // Compare the password with the hashed password
        const isMatch = await _bcryptjs.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }
        // Generate JWT token
        const token = _jsonwebtoken.default.sign({
            id: user.id,
            email: user.email,
            username: user.username,
            tier: user.tier
        }, SECRET_KEY, {
            expiresIn: '1h'
        });
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                tier: user.tier
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            message: 'Server error during login'
        });
    }
};

//# sourceMappingURL=authController.js.map