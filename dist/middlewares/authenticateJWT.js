"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Importing jwt
const types_1 = require("../types"); // Correctly import from index.ts
// Secret key for JWT verification, should be in environment variables for security
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
// Middleware to authenticate token and attach user data to the request
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Authorization" header
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    // Try to verify the token using jwt.verify
    try {
        // jwt.verify automatically accepts options, so we can type the function instead of the options object
        jsonwebtoken_1.default.verify(token, SECRET_KEY, { algorithms: ['HS256'] }, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid or expired token' });
            }
            // Check if the decoded token is an object and contains the user payload
            if (decoded && typeof decoded === 'object' && decoded !== null) {
                // Ensure 'tier' is always defined as UserTier (fix the type mismatch)
                const decodedUser = decoded;
                if (!decodedUser.tier) {
                    decodedUser.tier = types_1.UserTier.Free; // Set a default tier using the enum value
                }
                req.user = decodedUser; // Attach user payload to request
            }
            else {
                return res.status(401).json({ message: 'Invalid token structure' });
            }
            next(); // Proceed to the next middleware or route handler
        });
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
