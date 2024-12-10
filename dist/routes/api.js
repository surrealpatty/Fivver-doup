"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // JWT for verifying tokens
// Secret key for JWT verification, you should store it in an environment variable for security
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with your actual secret key
// Middleware to check if the user is authenticated
const checkAuth = (req, // Use AuthRequest instead of Request
res, next) => {
    // Use req.get() to safely access the authorization header
    const token = req.get('authorization')?.split(' ')[1]; // Assuming token is passed as "Bearer token"
    if (!token) {
        res.status(401).json({ message: 'Authorization token is missing' });
        return; // Ensure function returns when response is sent
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        // Handle the case where email is optional and may be undefined
        if (decoded.email === undefined) {
            console.warn('User payload is missing email');
        }
        // Attach user information to the request object for further use in the route
        req.user = decoded; // TypeScript will now know req.user is of type AuthRequest
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return; // Ensure function returns when response is sent
    }
};
exports.checkAuth = checkAuth;
