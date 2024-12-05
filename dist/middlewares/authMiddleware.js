"use strict";
// src/middlewares/authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define your JWT secret key
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual secret key
// Middleware to authenticate JWT token
const authenticateJWT = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token
    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }
    // Verify the token and decode it
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        // Ensure decoded is typed as JwtPayload, and assert as UserPayload for proper typing
        const decodedPayload = decoded;
        // Attach the user data to the request object
        req.user = {
            id: decodedPayload.id,
            email: decodedPayload.email,
            username: decodedPayload.username,
            tier: decodedPayload.tier, // Ensure 'tier' is present
        };
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authMiddleware.js.map