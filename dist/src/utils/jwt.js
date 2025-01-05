"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import the 'jsonwebtoken' library
// Secret key for JWT generation and verification (ensure this is securely stored in environment variables)
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Fallback secret key for JWT
// Utility function to generate JWT token
const generateToken = (user) => {
    // Create the payload with user details
    const payload = {
        id: user.id,
        email: user.email, // Include email as part of the payload
        username: user.username,
        tier: user.tier, // Include all necessary fields from UserPayload
        role: user.role, // Include role if it's part of your user model
    };
    // Sign and return the token with 1 hour expiration
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
};
exports.generateToken = generateToken;
// Function to verify JWT token and return the decoded user data
const verifyToken = (token) => {
    try {
        // Verify and decode the token
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY); // Manually specify the expected type
        // Return the decoded user payload if verification is successful
        return decoded;
    }
    catch (err) {
        // Log the error and return null if verification fails
        console.error('Token verification failed:', err);
        return null; // Return null if the token is invalid or expired
    }
};
exports.verifyToken = verifyToken;
