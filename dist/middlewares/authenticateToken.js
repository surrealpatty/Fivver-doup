"use strict";
// src/middlewares/authenticateToken.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Explicitly define the return type as void
const authenticateToken = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // If no token is provided, respond with 401 and stop further execution
    if (!token) {
        res.status(401).json({ message: 'Access Denied: No token provided' }); // Sending a response, no return value needed
        return; // Ensure the function terminates after sending the response
    }
    try {
        // Decode the token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        // Attach user info to the request object, ensuring 'tier' is present
        req.user = {
            id: decoded.id,
            email: '', // Replace with logic to retrieve email if available
            username: '', // Replace with logic to retrieve username if available
            tier: 'free', // Replace with logic to retrieve the user's tier if available
            role: '', // Optional field, replace with logic if needed
        }; // Ensure the type matches UserPayload interface
        next(); // Continue to the next middleware or route handler
    }
    catch (err) {
        // If the token is invalid, respond with 401 and stop execution
        res.status(401).json({ message: 'Access Denied: Invalid token' }); // Same here
        return; // Ensure the function terminates after sending the response
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map