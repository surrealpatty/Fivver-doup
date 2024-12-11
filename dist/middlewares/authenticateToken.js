"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureUser = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
// Middleware to check if the user is authenticated
const authenticateToken = (req, // Ensure req is typed as AuthRequest
res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        res.status(401).json({ message: 'Authorization token is missing or invalid' }); // Send response without returning
        return; // Stop further execution
    }
    const token = authorizationHeader.split(' ')[1]; // Assuming token is passed as "Bearer token"
    if (!token) {
        res.status(401).json({ message: 'Authorization token is missing' }); // Send response without returning
        return; // Stop further execution
    }
    try {
        // Verify the token and set user payload
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = decoded; // Explicitly set req.user as UserPayload
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' }); // Send response without returning
        return; // Stop further execution
    }
};
exports.authenticateToken = authenticateToken;
// Middleware to ensure the user is present in the request
const ensureUser = (req, // Ensure req is typed as AuthRequest
res, next) => {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' }); // Send response without returning
        return; // Stop further execution
    }
    next(); // Proceed to the next middleware or route handler
};
exports.ensureUser = ensureUser;
exports.default = exports.authenticateToken;
//# sourceMappingURL=authenticateToken.js.map