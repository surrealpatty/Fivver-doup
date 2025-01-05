"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
// The authenticateToken middleware function
const authenticateToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Bearer <token>'
    if (!token) {
        // Return an error if the token is missing
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    // Token verification options
    const options = {
        algorithms: ['HS256'], // Specify accepted algorithms
    };
    // Verify the JWT token
    jsonwebtoken_1.default.verify(token, SECRET_KEY, options, (err, decoded) => {
        if (err) {
            // Return an error if the token is invalid or expired
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        if (decoded) {
            // If the token is valid, attach the decoded user data to the request object
            req.user = decoded;
        }
        else {
            // Return an error if the token structure is invalid
            return res.status(401).json({ message: 'Invalid token structure' });
        }
        // Proceed to the next middleware
        next();
    });
};
exports.default = authenticateToken;
