"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.authenticateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Middleware to authenticate JWT and attach user data to the request object
var authenticateJWT = function (req, res, next) {
    return new Promise(function (resolve, reject) {
        var _a;
        // Extract the token from the Authorization header
        var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }
        try {
            // Verify the token using the secret key from the environment variable
            var secretKey = process.env.JWT_SECRET || 'fallback-secret-key'; // Use fallback if not defined
            var decoded = jsonwebtoken_1.default.verify(token, secretKey);
            // Attach decoded user information to the request object
            req.user = decoded;
            // Proceed to the next middleware
            next();
            resolve(); // Complete the promise
        }
        catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
            reject(); // Reject promise if token is invalid
        }
    });
};
exports.authenticateJWT = authenticateJWT;
// Optional: Middleware to check if the user is authenticated (user data is available in the request)
var checkAuth = function (req, res, next) {
    return new Promise(function (resolve, reject) {
        if (!req.user) {
            return res.status(403).json({ message: 'Access denied. No user found in request' });
        }
        next(); // Proceed to the next middleware or route handler
        resolve(); // Complete the promise
    });
};
exports.checkAuth = checkAuth;
