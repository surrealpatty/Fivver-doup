// src/controllers/authController.ts
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
const _user = require("../models/user");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const registerUser = async (req, res)=>{
    const { email, username, password } = req.body;
    try {
        if (!email || !username || !password) {
            return res.status(400).json({
                message: 'Please provide all fields'
            });
        }
        // Check if user already exists
        const existingUser = await _user.User.findOne({
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
        // Create a new user with default 'isVerified' set to false
        const user = await _user.User.create({
            email,
            username,
            password: hashedPassword,
            role: 'free',
            tier: 'free',
            isVerified: false
        });
        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
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
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide email and password'
            });
        }
        // Check if user exists
        const user = await _user.User.findOne({
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
            username: user.username
        }, process.env.JWT_SECRET || 'your-default-secret', {
            expiresIn: '1h'
        });
        return res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            message: 'Server error during login'
        });
    }
};

//# sourceMappingURL=authController.js.map