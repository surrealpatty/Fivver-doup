"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Use your actual secret key
const authenticateToken = (req, // Use AuthRequest here
res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is passed as "Bearer token"
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' }); // Return a response if no token
    }
    try {
        // Verify the token and assign the decoded payload to UserPayload type
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        // Check if the decoded token contains the necessary information
        if (!decoded.id || !decoded.tier) {
            console.warn('User payload is missing required information');
            return res.status(400).json({ message: 'User payload is missing required information' });
        }
        // Attach the decoded user information to the request object for further use
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next(); // Proceed to the next middleware without returning the Response
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
