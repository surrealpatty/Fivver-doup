"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
const authenticateToken = (req, // Use AuthRequest interface to extend the user field
res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    // Verify the token and decode the payload
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        // Attach decoded user data to the request
        req.user = decoded;
        // Proceed to the next middleware
        next();
    });
};
exports.authenticateToken = authenticateToken;
