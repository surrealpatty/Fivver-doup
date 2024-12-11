"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
// Middleware to check if the user is authenticated
const authenticateToken = (req, // Ensure req is typed as AuthRequest
res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        // Send a response and do not return anything
        res.status(401).json({ message: 'Authorization token is missing or invalid' });
        return; // Ensure no further code execution
    }
    const token = authorizationHeader.split(' ')[1]; // Assuming token is passed as "Bearer token"
    if (!token) {
        // Send a response and do not return anything
        res.status(401).json({ message: 'Authorization token is missing' });
        return; // Ensure no further code execution
    }
    try {
        // Verify the token and set user payload
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = decoded; // TypeScript now knows req.user is of type UserPayload
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        // Send a response and do not return anything
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
exports.default = exports.authenticateToken;
//# sourceMappingURL=authenticateToken.js.map