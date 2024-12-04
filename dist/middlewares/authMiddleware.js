"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const authenticateJWT = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }
    try {
        // Verify the token using the secret key from the environment variable
        const secretKey = process.env.JWT_SECRET || 'fallback-secret-key'; // Use fallback if not defined
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        // Attach decoded user information to the request object
        req.user = decoded;
        // Proceed to the next middleware
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateJWT = authenticateJWT;
// Optional: A simple middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied. No user found in request' });
    }
    next();
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=authMiddleware.js.map