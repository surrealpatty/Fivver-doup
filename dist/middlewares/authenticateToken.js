"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET; // Assert type as string
if (!jwtSecret) {
    console.error('JWT_SECRET is not set. Authentication will fail.');
}
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;
        if (!token) {
            return res.status(401).json({ message: 'Access denied, no token provided.' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.user = decoded; // Attach the decoded token to req.user
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Authentication error:', error.message);
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }
        console.error('Unexpected error during authentication:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
exports.authenticateToken = authenticateToken;
