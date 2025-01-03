"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to authenticate the token and attach user information to req.user
const authenticateToken = (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        // If no token is provided, send a response and return early
        res.status(401).json({ message: 'No token provided.' });
        return;
    }
    try {
        // Verify the token and decode the payload
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Attach the decoded user payload to req.user
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (err) {
        // If token verification fails, send a response and return early
        res.status(403).json({ message: 'Invalid token.' });
        return;
    }
};
exports.authenticateToken = authenticateToken;
