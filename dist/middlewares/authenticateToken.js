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
        res.status(401).json({ message: 'Access Denied: No token provided' });
        return;
    }
    try {
        // Decode the token using JWT
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        // Attach the user information to req.user, ensuring 'tier' is included
        req.user = {
            id: decoded.id,
            email: '', // Optional: Retrieve email from your data if needed
            username: '', // Optional: Retrieve username if needed
            tier: decoded.tier, // Ensure `tier` is populated from the decoded token
            role: '', // Optional: Retrieve role if needed
        };
        next(); // Proceed to the next middleware or route handler
    }
    catch (err) {
        res.status(401).json({ message: 'Access Denied: Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map