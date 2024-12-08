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
const checkAuth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is passed as "Bearer token"
    if (!token) {
        res.status(401).json({ message: 'Authorization token is missing' });
        return; // Ensure function returns when response is sent
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        // Attach user information to the request object for further use in the route
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return; // Ensure function returns when response is sent
    }
};
exports.checkAuth = checkAuth;
