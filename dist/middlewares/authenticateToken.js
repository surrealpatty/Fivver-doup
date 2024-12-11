"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with environment variable or config
// Middleware to authenticate the user using a JWT token
const authenticateToken = (req, // Ensure req is typed as AuthRequest
res, next) => {
    // Extract the Authorization header
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        // Send response without returning
        res.status(401).json({ message: 'Authorization token is missing or invalid' });
        return; // Exit early, avoiding further execution
    }
    // Token is expected in "Bearer <token>" format
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        // Send response without returning
        res.status(401).json({ message: 'Authorization token is missing' });
        return; // Exit early, avoiding further execution
    }
    try {
        // Decode the token using jwt.verify, which returns a UserPayload
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        // Attach the decoded user data to the request object
        req.user = decoded;
        // Continue to the next middleware or route handler
        next();
    }
    catch (error) {
        // Handle invalid or expired token error
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map