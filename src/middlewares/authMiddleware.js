"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Get JWT secret from environment variables
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error('JWT_SECRET is not set. Authentication will fail.');
}
/**
 * Middleware to authenticate the token provided in the Authorization header.
 * If the token is valid, the decoded payload is attached to `req.user`.
 */
const authenticateToken = (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const authHeader = req.headers['authorization'];
        const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')) ? authHeader.split(' ')[1] : undefined;
        if (!token) {
            res.status(401).json({ message: 'Access denied, no token provided.' });
            return;
        }
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        // Attach the decoded payload to req.user
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Authentication error:', error.message);
            res.status(403).json({ message: 'Invalid or expired token.' });
            return;
        }
        // Fallback for cases when the error is not of type `Error`
        console.error('Unexpected error during authentication:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
exports.authenticateToken = authenticateToken;
/**
 * Middleware to check if the user is authenticated.
 * It uses `authenticateToken` and adds additional checks if needed.
 */
const checkAuth = (req, res, next) => {
    // Use the authenticateToken middleware to check if the token is valid
    (0, exports.authenticateToken)(req, res, () => {
        // Additional checks can go here (if needed)
        if (req.user) {
            // If user is authenticated, continue to the next route handler
            next();
        }
        else {
            res.status(401).json({ message: 'Authentication failed.' });
        }
    });
};
exports.checkAuth = checkAuth;
