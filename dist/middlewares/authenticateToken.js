"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    // Retrieve the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        // Send response and exit the middleware
        res.status(401).json({ message: 'Access Denied: No token provided' });
        return;
    }
    try {
        // Decode the token using JWT
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        // Attach the decoded user information to req.user, ensuring 'tier' is included
        req.user = {
            id: decoded.id,
            email: decoded.email || '',
            username: decoded.username || '',
            tier: decoded.tier, // Ensure `tier` is populated from the decoded token
            role: decoded.role || '', // Optional: You can include role if required
        };
        // Proceed to the next middleware or route handler
        next();
    }
    catch (err) {
        // Handle invalid token case and send a response
        res.status(401).json({ message: 'Access Denied: Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map