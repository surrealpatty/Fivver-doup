"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = exports.generateToken = exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config")); // Importing config for JWT_SECRET and JWT_EXPIRATION
var JWT_SECRET = config_1.default.JWT_SECRET;
var JWT_EXPIRATION = config_1.default.JWT_EXPIRATION || '1h';
// The `verifyToken` middleware to check JWT in headers
var verifyToken = function (req, // Use the custom AuthRequest type
res, next) {
    var _a;
    var token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, function (err, decoded) {
        if (err) {
            return res
                .status(401)
                .json({ message: 'Unauthorized', error: err.message });
        }
        // Handle decoding and verifying the JWT payload
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            var decodedToken = decoded;
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
var generateToken = function (userId) {
    return jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
    });
};
exports.generateToken = generateToken;
// Example middleware to authenticate the user using the token
var authenticateJWT = function (req, // Use the custom AuthRequest type here as well
res, next) {
    // Check if userId exists in request
    if (!req.userId) {
        return res.status(403).json({ message: 'No valid token or userId found.' });
    }
    next();
};
exports.authenticateJWT = authenticateJWT;
