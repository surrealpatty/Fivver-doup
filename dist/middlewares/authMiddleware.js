"use strict";
// src/middlewares/authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Use your actual secret key
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is passed as "Bearer token"
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' }); // Return a response if no token
    }
    try {
        // Verify the token and assign the decoded payload to UserPayload type
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        // Check if the decoded token contains necessary information
        if (!decoded.email || !decoded.username) {
            console.warn('User payload is missing required information');
            return res.status(400).json({ message: 'User payload is missing email or username' });
        }
        // Attach the decoded user information to the request object for further use
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next(); // Don't return Response, just call next() to move to the next middleware
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
