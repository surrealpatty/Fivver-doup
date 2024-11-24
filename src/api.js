"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
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
        // Extract the token after "Bearer"
        const token = authorizationHeader.split(' ')[1];
        // Check if the token is present
        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }
        // Ensure the JWT_SECRET is configured in the environment variables
        const jwtSecret = process.env.JWT_SECRET;
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
        // Handle token verification errors (e.g., expired or invalid token)
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
