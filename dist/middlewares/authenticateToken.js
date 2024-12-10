"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define the middleware function
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token
    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' }); // Send response directly
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error('JWT_SECRET is not configured');
        return res.status(500).json({ message: 'Internal server error' }); // Send response directly
    }
    // Verify token
    jsonwebtoken_1.default.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is invalid' });
        }
        const user = decoded; // Ensure the decoded token matches the UserPayload
        req.user = user; // Attach user to request object
        next(); // Pass control to the next middleware
    });
};
exports.default = authenticateToken;
