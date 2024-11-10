"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeSubscription = exports.authorizeRoles = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to authenticate the token
const authMiddleware = (req, res, next) => {
    // Extract token from Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No authorization header provided.' });
    }
    // Get the token from the Authorization header (format: "Bearer token")
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        // Verify token using JWT secret
        const verifiedUser = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = verifiedUser; // Attach verified user data to request for later use
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.error('Token verification error:', error.message);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
exports.authMiddleware = authMiddleware;
// Middleware to authorize based on user role
const authorizeRoles = (...allowedRoles) => (req, res, next) => {
    // Check if the user's role matches the allowed roles
    if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next(); // Proceed to the next middleware or route handler
};
exports.authorizeRoles = authorizeRoles;
// Middleware to check for subscription level (e.g., "Paid" subscription)
const authorizeSubscription = (requiredSubscription) => (req, res, next) => {
    // Check if the user has the required subscription level
    if (!req.user || req.user.subscription !== requiredSubscription) {
        return res.status(403).json({ message: `Access denied: ${requiredSubscription} subscription required.` });
    }
    next(); // Proceed to the next middleware or route handler
};
exports.authorizeSubscription = authorizeSubscription;
//# sourceMappingURL=authMiddleware.js.map