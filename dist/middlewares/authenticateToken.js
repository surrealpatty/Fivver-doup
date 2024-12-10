"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Fallback to a default secret key if not set in env
// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from 'Authorization' header
    if (!token) {
        return res.status(403).json({ message: 'Access denied, token not provided' }); // If token is missing
    }
    try {
        // Verify the token and decode it
        const decoded = jsonwebtoken_1.default.verify(token, secretKey); // Decode token and ensure it matches UserPayload
        req.user = decoded; // Attach decoded user data to the request object
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        return res.status(400).json({ message: 'Invalid token' }); // Handle invalid token error
    }
};
exports.authenticateToken = authenticateToken;
