"use strict";
// src/middlewares/authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Use your actual secret key
const checkAuth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is passed as "Bearer token"
    if (!token) {
        res.status(401).json({ message: 'Authorization token is missing' });
        return;
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        // If email is undefined, it's now an error due to it being required
        if (!decoded.email) {
            console.warn('User payload is missing email');
            res.status(400).json({ message: 'User payload is missing email' });
            return;
        }
        // Attach user information to the request object for further use
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.checkAuth = checkAuth;
