"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Secret key for JWT generation and verification
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Use environment variable for security
// Utility function to generate a JWT token
const generateToken = (user) => {
    // Ensure user object contains required properties
    const payload = {
        id: user.id,
        email: user.email, // Ensure email is part of the payload
        username: user.username,
        tier: user.tier, // Include tier if it's part of the user model
        role: user.role, // Include role for authorization purposes
    };
    try {
        // Sign and return the token with a 1-hour expiration
        return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    }
    catch (err) {
        // Log the error and throw a custom error if token generation fails
        console.error('Token generation failed:', err);
        throw new Error('Failed to generate token');
    }
};
exports.generateToken = generateToken;
// Function to verify a JWT token and return the decoded user data
const verifyToken = (token) => {
    try {
        // Verify and decode the token
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        // Return the decoded user payload if verification is successful
        return decoded;
    }
    catch (err) {
        // Log the error and return null if verification fails
        console.error('Token verification failed:', err);
        return null; // Return null for invalid or expired tokens
    }
};
exports.verifyToken = verifyToken;
