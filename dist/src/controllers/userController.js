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
    getUserById: function() {
        return getUserById;
    },
    registerUser: function() {
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
    // Destructuring input, ensuring correct types
    const { email, username, password, tier = 'free', role = 'user' } = req.body;
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
            return res.status(409).json({
                message: 'User already exists with this email.'
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
            role,
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
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            // Enhanced error logging: Log error message and stack trace
            console.error('Error registering user:', error.message);
            console.error('Stack trace:', error.stack);
            // Return a generic 500 error response to the client
            return res.status(500).json({
                message: 'Internal server error during registration.',
                error: error.message
            });
        } else {
            // Handle unexpected error types
            console.error('Unexpected error:', error);
            // Return a generic 500 error response for unknown error types
            return res.status(500).json({
                message: 'Internal server error during registration.',
                error: 'An unexpected error occurred.'
            });
        }
    }
};
const getUserById = async (req, res)=>{
    try {
        const user = await _user.User.findByPk(req.params.id); // Or another method to find the user
        if (!user) {
            // Return a 404 status with the correct message
            return res.status(404).json({
                message: 'User not found'
            });
        }
        // Return the user data (excluding sensitive data like password)
        return res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            tier: user.tier,
            isVerified: user.isVerified,
            createdAt: user.createdAt
        });
    } catch (error) {
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            // Enhanced error logging for unexpected errors
            console.error('Error fetching user by ID:', error.message);
            console.error('Stack trace:', error.stack);
            // Handle any unexpected errors
            return res.status(500).json({
                message: 'Internal server error while fetching user.',
                error: error.message
            });
        } else {
            // Handle unexpected error types
            console.error('Unexpected error:', error);
            // Return a generic 500 error response for unknown error types
            return res.status(500).json({
                message: 'Internal server error while fetching user.',
                error: 'An unexpected error occurred.'
            });
        }
    }
};
