"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define the secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
/**
 * Middleware to authenticate users via JWT token.
 * Attaches the decoded user information to the `req.user` property.
 */
const authenticateToken = (req, res, next) => {
    // Extract the token from the Authorization header (Bearer token)
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        // Log missing token for debugging purposes
        console.log('Authorization token is missing');
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    try {
        // Verify and decode the token
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        // Log the decoded token for debugging purposes
        console.log('Decoded token:', decoded);
        // Attach the decoded user information to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        // Log token verification failure for debugging purposes
        console.log('Token verification failed:', error);
        // Return a 403 status if the token is invalid or expired
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
