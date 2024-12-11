"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = exports.generateToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config")); // Importing config for JWT_SECRET and JWT_EXPIRATION
const JWT_SECRET = config_1.default.JWT_SECRET;
const JWT_EXPIRATION = config_1.default.JWT_EXPIRATION || '1h';
// The `verifyToken` middleware to check JWT in headers
const verifyToken = (req, // Use the custom AuthRequest type
res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({ message: 'Unauthorized', error: err.message });
        }
        // Handle decoding and verifying the JWT payload
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            const decodedToken = decoded;
            // Cast decodedToken.id to string (if necessary)
            req.userId = String(decodedToken.id); // Explicitly cast to string
            return next();
        }
        else {
            return res.status(401).json({ message: 'Invalid token' });
        }
    });
};
exports.verifyToken = verifyToken;
// Generate a token for the user
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
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
    next();
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=auth.js.map