"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error('JWT_SECRET is not set. Authentication will fail.');
}
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')) ? authHeader.split(' ')[1] : undefined;
        if (!token) {
            res.status(401).json({ message: 'Access denied, no token provided.' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Authentication error:', error.message);
            res.status(403).json({ message: 'Invalid or expired token.' });
            return;
        }
        console.error('Unexpected error during authentication:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
exports.authenticateToken = authenticateToken;
const checkAuth = (req, res, next) => {
    (0, exports.authenticateToken)(req, res, () => {
        if (req.user) {
            next();
        }
        else {
            res.status(401).json({ message: 'Authentication failed.' });
        }
    });
};
exports.checkAuth = checkAuth;
