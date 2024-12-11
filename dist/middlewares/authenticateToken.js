"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
// Middleware to authenticate the user using a JWT token
const authenticateToken = (req, // Ensure req is typed as AuthRequest
res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        res.status(401).json({ message: 'Authorization token is missing or invalid' });
        return; // Terminate the function after sending the response
    }
    // Extract the token from the Authorization header
    const token = authorizationHeader.split(' ')[1]; // Token is expected in "Bearer token" format
    if (!token) {
        res.status(401).json({ message: 'Authorization token is missing' });
        return; // Terminate the function after sending the response
    }
    try {
        // Decode the token and ensure it's a valid UserPayload
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY); // Assert type as UserPayload
        req.user = decoded; // Set req.user to the decoded payload (UserPayload)
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return; // Terminate the function after sending the response
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map