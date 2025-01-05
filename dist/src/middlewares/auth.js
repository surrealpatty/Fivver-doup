"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = exports.generateToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Use only the default import
const config_1 = __importDefault(require("../config/config"));
// Utility function to get the configuration for the current environment
const getConfig = () => {
    const env = process.env.NODE_ENV || 'development';
    if (env in config_1.default) {
        return config_1.default[env];
    }
    throw new Error(`Invalid NODE_ENV: ${env}`);
};
// Middleware to verify the JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the "Bearer token" format
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    const { JWT_SECRET } = getConfig();
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized', error: err.message });
        }
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            req.userId = decoded.id; // Store the userId in the request object
            return next(); // Proceed to the next middleware
        }
        else {
            return res.status(401).json({ message: 'Invalid token' });
        }
    });
};
exports.verifyToken = verifyToken;
// Function to generate a JWT for a user
const generateToken = (userId) => {
    const { JWT_SECRET, JWT_EXPIRATION } = getConfig();
    return jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
    });
};
exports.generateToken = generateToken;
// Middleware to authenticate the user based on the JWT
const authenticateJWT = (req, res, next) => {
    if (!req.userId) {
        return res.status(403).json({ message: 'No valid token or userId found.' });
    }
    next(); // User authenticated, proceed to the next middleware or route handler
};
exports.authenticateJWT = authenticateJWT;
