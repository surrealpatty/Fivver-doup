"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = exports.generateToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config")); // Ensure config is imported correctly
// The `verifyToken` middleware to check JWT in headers
const verifyToken = (req, // Use the custom AuthRequest type
res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer token" format
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    // Verify the token using JWT secret from config
    jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET, // Explicitly ensure JWT_SECRET is a string
    (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized', error: err.message });
        }
        // Handle decoding and verifying the JWT payload
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            const decodedToken = decoded;
            req.userId = String(decodedToken.id); // Explicitly cast to string for userId
            return next(); // Continue to the next middleware or route handler
        }
        else {
            return res.status(401).json({ message: 'Invalid token' });
        }
    });
};
exports.verifyToken = verifyToken;
// Generate a token for the user
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, config_1.default.JWT_SECRET, // Explicitly ensure JWT_SECRET is a string
    {
        expiresIn: config_1.default.JWT_EXPIRATION, // Explicitly ensure JWT_EXPIRATION is a string
    });
};
exports.generateToken = generateToken;
// Example middleware to authenticate the user using the token
const authenticateJWT = (req, // Use the custom AuthRequest type here as well
res, next) => {
    // Check if userId exists in request
    if (!req.userId) {
        return res.status(403).json({ message: 'No valid token or userId found.' });
    }
    next(); // User authenticated, proceed to the next middleware or route handler
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=auth.js.map