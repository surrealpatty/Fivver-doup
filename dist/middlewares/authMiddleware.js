"use strict";
// src/middlewares/authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization'); // Retrieve token from the 'Authorization' header
    if (!token) {
        return res.status(403).json({ message: 'Access denied, token not provided' });
    }
    try {
        // Verify the token, assuming the decoded value matches UserPayload or undefined
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        // Assign decoded to req.user with type UserPayload or undefined
        req.user = decoded; // This will correctly handle undefined or a valid UserPayload
        next(); // Call the next middleware or route handler
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
