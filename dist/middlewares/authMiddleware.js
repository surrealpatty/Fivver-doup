"use strict";
// src/middlewares/authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        // Assuming the 'user' object from JWT contains the 'tier' information
        if (user) {
            // Cast the 'user' to match our UserPayload interface
            const userPayload = {
                id: user.id,
                email: user.email,
                username: user.username,
                tier: user.tier, // Make sure 'tier' is coming from the JWT or elsewhere
            };
            req.user = userPayload; // Attach the user info (including tier) to req.user
        }
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authMiddleware.js.map