"use strict";
// src/middlewares/authenticateToken.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    // Get token from Authorization header (expects format: "Bearer <token>")
    const token = req.headers['authorization']?.split(' ')[1];
    return new Promise((resolve, reject) => {
        // Check if token exists
        if (!token) {
            return res.status(403).json({ message: 'Access denied, no token provided' });
        }
        // Retrieve JWT secret from environment variables
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not configured in the environment variables');
            return res.status(500).json({ message: 'Internal server error' });
        }
        // Verify token
        jsonwebtoken_1.default.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token is invalid' });
            }
            // Ensure decoded object matches the expected payload structure
            const user = decoded;
            // Attach the decoded user data to the request object
            req.user = user;
            // Proceed to the next middleware or route handler
            next();
            resolve(); // Resolve the promise when next() is called
        });
    });
};
exports.default = authenticateToken;
