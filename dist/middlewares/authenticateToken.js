"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Authorization token is missing or invalid' });
            return;
        }
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Authorization token is missing' });
            return;
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not configured in the environment variables');
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error('Token authentication failed:', error);
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
