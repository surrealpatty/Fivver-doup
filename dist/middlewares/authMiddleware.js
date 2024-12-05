"use strict";
// src/middlewares/authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }
    jsonwebtoken_1.default.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }
        // Ensure decoded JWT contains the required properties, including 'tier'
        const userPayload = {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username,
            tier: decoded.tier, // 'tier' should be present in decoded token
        };
        // Type cast req.user to AuthRequest to include the correct user payload
        req.user = userPayload;
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authMiddleware.js.map