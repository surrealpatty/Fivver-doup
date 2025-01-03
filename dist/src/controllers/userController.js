// src/controllers/userController.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerUser", {
    enumerable: true,
    get: function() {
        return registerUser;
    }
});
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _user = require("../models/user");
const _jwt = require("../utils/jwt");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const registerUser = async (req, res)=>{
    const { email, username, password, tier = 'free' } = req.body;
    // Input validation: Ensure required fields are provided
    if (!email || !username || !password) {
        return res.status(400).json({
            message: 'Email, username, and password are required.'
        });
    }
    try {
        // Check if the user already exists by email
        const existingUser = await _user.User.findOne({
            where: {
                email
            }
        });
        if (existingUser) {
            // If a user exists with the given email, respond with a 400 status code
            return res.status(400).json({
                error: 'Email already exists'
            });
        }
        // Hash the user's password before saving to the database
        const hashedPassword = await _bcryptjs.default.hash(password, 10);
        // Default role, tier, and isVerified properties (assumed defaults)
        const newUser = await _user.User.create({
            email,
            username,
            password: hashedPassword,
            tier,
            role: 'user',
            isVerified: false
        });
        // Generate a JWT token for the new user
        const token = (0, _jwt.generateToken)(newUser);
        // Respond with the user data (excluding password) and the JWT token
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                role: newUser.role,
                tier: newUser.tier,
                isVerified: newUser.isVerified,
                createdAt: newUser.createdAt
            },
            token
        });
    } catch (error) {
        // Type assertion for 'error' to be of type 'Error'
        if (error instanceof Error) {
            console.error('Error registering user:', error);
            // Check if the error is related to a database issue or something else
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    error: 'Email already exists'
                });
            }
            return res.status(500).json({
                message: 'Internal server error during registration.'
            });
        } else {
            // In case the error is not of type 'Error', log and handle the unknown case
            console.error('Unknown error:', error);
            return res.status(500).json({
                message: 'Internal server error during registration.'
            });
        }
    }
};
