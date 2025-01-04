"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Secret key for JWT verification, should be in environment variables for security
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
// Middleware to authenticate token and attach user data to the request
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Authorization" header
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    // Define the options for JWT verification without `complete: true`
    const options = {
        algorithms: ['HS256'], // Specify the algorithm type correctly
    };
    try {
        // Verify the token and get the decoded payload
        jsonwebtoken_1.default.verify(token, SECRET_KEY, options, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid or expired token' });
            }
            // Since `decoded` can be `string | JwtPayload`, we assert that it's `JwtPayload`
            if (typeof decoded === 'object' && decoded !== null) {
                req.user = decoded; // Assert that decoded is of type UserPayload
            }
            else {
                return res.status(401).json({ message: 'Invalid token structure' });
            }
            // Proceed to the next middleware or route handler
            next();
        });
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
