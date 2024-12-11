"use strict";
// src/middleware/authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded.tier) {
            return res.status(401).json({ message: 'Access Denied: Missing tier information' });
        }
        req.user = {
            id: decoded.id,
            email: decoded.email || '',
            username: decoded.username || '',
            tier: decoded.tier, // This is now guaranteed to exist
            role: decoded.role || '',
        };
        next(); // Continue to next middleware/route handler
    }
    catch (err) {
        return res.status(401).json({ message: 'Access Denied: Invalid token' });
    }
};
exports.default = authenticateToken;
//# sourceMappingURL=authMiddleware.js.map