"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define the secret key for JWT, falling back to a default value if not found in environment variables
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
/**
 * Middleware to authenticate users via JWT token.
 * Attaches the decoded user information to the `req.user` property.
 */
const authenticateToken = (req, // Ensure correct type for `user`
res, next) => {
    // Extract the token from the Authorization header (Bearer token format)
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    // If the token is missing, return an error response
    if (!token) {
        console.error('Authorization token is missing'); // Log missing token for debugging
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    try {
        // Verify and decode the JWT token using the secret key
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log('Decoded token:', decoded); // Log the decoded token for debugging purposes
        // Attach the decoded user information to the `req.user` object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        console.error('Token verification failed:', error); // Log any token verification failures
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
exports.default = authenticateToken; // Default export for use in route files
