"use strict";
// src/middlewares/authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to authenticate JWT and attach user data (including 'tier') to the request object
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        // Decode the token, assuming the payload contains 'id', 'email', 'username', and 'tier'
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Attach decoded user information (including tier) to the request object
        req.user = {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username,
            tier: decoded.tier
        };
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
exports.authenticateJWT = authenticateJWT;
// Middleware to check if the user is authenticated (i.e., has a user object attached to the request)
const checkAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized. No user data found.' });
    }
    next();
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=authMiddleware.js.map