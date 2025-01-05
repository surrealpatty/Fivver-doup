"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import the jsonwebtoken package
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    // Define token verification options
    const options = {
        algorithms: ['HS256'], // Specify accepted algorithms
    };
    // Verify the token and handle the decoded payload
    jsonwebtoken_1.default.verify(token, SECRET_KEY, options, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        if (decoded) {
            req.user = decoded; // Cast to UserPayload type
        }
        else {
            return res.status(401).json({ message: 'Invalid token structure' });
        }
        next(); // Proceed to the next middleware
    });
};
exports.authenticateToken = authenticateToken;
