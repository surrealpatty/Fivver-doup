"use strict";
// src/middlewares/authenticateToken.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import jsonwebtoken
// Middleware to authenticate the JWT token and attach user to the request object
const authenticateToken = (req, res, next) => {
    // Extract the token from the Authorization header (Bearer <token>)
    const token = req.headers['authorization']?.split(' ')[1];
    // If no token is provided, respond with a 401 Unauthorized status
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    // Verify the token using jsonwebtoken's verify function
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'yourSecretKey', (err, user) => {
        if (err) {
            // Log the error for debugging purposes
            console.error('Token verification failed:', err);
            // If token is invalid or expired, respond with a 403 Forbidden status
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        // Attach the decoded user information to the request object
        req.user = user;
        // Pass control to the next middleware or route handler
        next();
    });
};
exports.authenticateToken = authenticateToken;
