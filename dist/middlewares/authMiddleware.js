"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Use environment variable or fallback to default
// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization'); // Retrieve token from the 'Authorization' header
    if (!token) {
        return res.status(403).json({ message: 'Access denied, token not provided' }); // Return Response if no token
    }
    try {
        // Verify the token, assuming the decoded value matches UserPayload or undefined
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        // Assign decoded to req.user with type UserPayload or undefined
        req.user = decoded; // This will correctly handle undefined or a valid UserPayload
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        return res.status(400).json({ message: 'Invalid token' }); // Return Response if token is invalid
    }
};
exports.authenticateToken = authenticateToken;
// Middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: 'User not authenticated' }); // Return Response if user is not authenticated
    }
    next(); // Proceed to the next middleware or route handler if user is authenticated
};
exports.checkAuth = checkAuth;
