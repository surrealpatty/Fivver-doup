"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    // Check if token exists
    if (!token) {
        res.status(403).json({ message: 'Access denied, no token provided' });
        return;
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error('JWT_SECRET is not configured in the environment variables');
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
    // Verify token
    jsonwebtoken_1.default.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Token is invalid' });
            return;
        }
        // Attach the decoded user data to the request object
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    });
};
exports.default = authenticateToken;
