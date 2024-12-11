"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // If no token is provided, return a 401 Unauthorized error
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }
    try {
        // Verify the token and decode it as UserPayload
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        // Check if 'tier' exists in the decoded payload, which is required
        if (!decoded.tier) {
            return res.status(401).json({ message: 'Access Denied: Missing tier information' });
        }
        // Assign the decoded user information to req.user
        req.user = {
            id: decoded.id,
            email: decoded.email || '', // Fallback to empty string if email is missing
            username: decoded.username || '', // Fallback to empty string if username is missing
            tier: decoded.tier, // Tier is now guaranteed to exist
            role: decoded.role || '', // Fallback to empty string if role is missing
        };
        // Continue to the next middleware or route handler
        next();
    }
    catch (err) {
        // If token verification fails, return a 401 Unauthorized error
        return res.status(401).json({ message: 'Access Denied: Invalid token' });
    }
};
exports.default = authenticateToken;
//# sourceMappingURL=authMiddleware.js.map