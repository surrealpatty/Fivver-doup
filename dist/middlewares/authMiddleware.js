"use strict";
/// <reference path="../types/express.d.ts" />  // Explicitly reference the custom types file (only if needed)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.checkAuth = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error('JWT_SECRET is not set. Authentication will fail.');
}
/**
 * Middleware to authenticate the token provided in the Authorization header.
 * If the token is valid, the decoded payload is attached to `req.user`.
 */
const authenticateToken = (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : undefined;
        if (!token) {
            res.status(401).json({ message: 'Access denied, no token provided.' });
            return; // Explicit return to satisfy TypeScript's void requirement
        }
        // Verify the token
        jsonwebtoken_1.default.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                res.status(403).json({ message: 'Invalid or expired token.' });
                return; // Explicit return to end execution
            }
            // Attach the decoded payload to req.user
            req.user = decoded; // Ensure 'user' is typed as UserPayload
            // Proceed to the next middleware or route handler
            next();
        });
    }
    catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Internal server error during authentication.' });
        return; // Explicit return to end execution
    }
};
exports.authenticateToken = authenticateToken;
/**
 * Middleware to check if the user is authenticated.
 * It uses `authenticateToken` and adds additional checks if needed.
 */
const checkAuth = (req, res, next) => {
    (0, exports.authenticateToken)(req, res, () => {
        // Additional checks can be added here if needed (e.g., check if user is active)
        if (req.user) {
            next(); // If authenticated, proceed to the next route handler
        }
        else {
            res.status(401).json({ message: 'Authentication failed.' });
        }
    });
};
exports.checkAuth = checkAuth;
/**
 * Utility function to generate a JWT token for a user.
 * @param user The user object to generate a token for.
 * @returns A signed JWT token.
 */
const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username // Include username in the token
    };
    return jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: '1h' }); // You can modify expiration as needed
};
exports.generateToken = generateToken;
exports.default = exports.authenticateToken;
//# sourceMappingURL=authMiddleware.js.map