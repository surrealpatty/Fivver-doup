"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Secret key for JWT verification, should be in environment variables for security
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with your actual secret key
// Middleware to authenticate token and attach user data to the request
const authenticateToken = (req, // The request type
res, // The response type
next // The next middleware function
) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Authorization" header
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    try {
        // Verify the token and decode it to UserPayload type
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        // Attach user data to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authMiddleware.js.map