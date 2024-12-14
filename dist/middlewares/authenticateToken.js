"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Secret key for JWT, fallback to a default if not set in environment variables
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Use environment variable or config
// Middleware to authenticate the user using a JWT token
const authenticateToken = (req, res, next) => {
    // Extract the Authorization header
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        // Send response if Authorization token is missing
        res.status(401).json({ message: 'Authorization token is missing' });
        return; // Exit the middleware here without returning anything
    }
    // Token is expected in "Bearer <token>" format
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        // Send response if token part is missing
        res.status(401).json({ message: 'Authorization token is missing' });
        return; // Exit the middleware here without returning anything
    }
    try {
        // Verify the token using jwt.verify
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY); // Type assertion to UserPayload
        // Attach the decoded user data to the request object
        req.user = decoded; // You can now access req.user in subsequent middlewares/routes
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        console.error('Invalid or expired token:', error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map