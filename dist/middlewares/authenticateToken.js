"use strict";
// src/middlewares/authenticateToken.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // If no token is provided, respond with 401 and stop further execution
    if (!token) {
        res.status(401).json({ message: 'Access Denied: No token provided' });
        return; // Make sure to return here to stop further execution
    }
    try {
        // Decode the token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        // Attach user info to the request object
        req.user = {
            id: decoded.id,
            email: '', // Replace with actual logic to retrieve the email
            username: '', // Replace with actual logic to retrieve the username
            tier: 'free', // Replace with actual logic to retrieve the tier (or use the appropriate logic for tier)
            role: '', // Optional field
        }; // Ensure the type matches UserPayload interface
        next(); // Continue to the next middleware or route handler
    }
    catch (err) {
        // If the token is invalid, respond with 401
        res.status(401).json({ message: 'Access Denied: Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map