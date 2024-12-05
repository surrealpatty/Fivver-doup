"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Declare the return type of the middleware as void
const authenticateJWT = (req, res, next) => {
    // Get token from Authorization header (split to remove 'Bearer ')
    const token = req.header('Authorization')?.split(' ')[1];
    // If no token is found, send a 403 response
    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }
    // Verify the JWT token
    jsonwebtoken_1.default.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            // If token is invalid or expired, send a 403 response
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }
        // Ensure decoded JWT contains the required properties, including 'tier'
        const userPayload = {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username,
            tier: decoded.tier, // 'tier' should be present in decoded token
        };
        // Add the user payload to the request object, type cast to AuthRequest
        req.user = userPayload;
        // Proceed to the next middleware or route handler
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authMiddleware.js.map