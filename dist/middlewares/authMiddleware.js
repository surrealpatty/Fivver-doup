"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const authorizationHeader = req.headers['authorization'];
        // Check if the header exists and starts with "Bearer"
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token is missing or invalid' });
        }
        const token = authorizationHeader.split(' ')[1]; // Extract the token after "Bearer"
        // Check if the token is present
        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }
        const jwtSecret = process.env.JWT_SECRET;
        // Ensure the JWT_SECRET is configured in the environment variables
        if (!jwtSecret) {
            console.error('JWT_SECRET is not configured in the environment variables');
            return res.status(500).json({ message: 'Internal server error' });
        }
        // Verify the token and decode the payload
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        // Attach the user data from the decoded token to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        console.error('Token authentication failed:', error);
        // Handle token verification errors
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
// Example checkAuth middleware (if you need it for specific routes)
const checkAuth = (req, res, next) => {
    // You can add custom logic for checking if the user is authenticated
    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    next();
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=authMiddleware.js.map