"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = exports.generateToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
// Middleware to verify the JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the "Bearer token" format
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    // Verify the token using the secret from config
    jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET, // JWT_SECRET is already a string in the config
    (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized', error: err.message });
        }
        // Ensure decoded payload is valid and contains an ID
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            const decodedToken = decoded;
            req.userId = String(decodedToken.id); // Store the userId in the request object
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
    return jsonwebtoken_1.default.sign({ id: userId }, // Payload containing the user ID
    config_1.default.JWT_SECRET, // JWT_SECRET from config
    {
        expiresIn: config_1.default.JWT_EXPIRATION, // JWT_EXPIRATION from config
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
//# sourceMappingURL=auth.js.map