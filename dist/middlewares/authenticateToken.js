"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Assuming you're using JWT for token authentication
const authenticateToken = (req, res, next) => {
    // Extract token from authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming a Bearer token format
    // If no token, send Unauthorized response
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // Verify the token with JWT
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        // If verification fails, send Forbidden response
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        // Assign the user object to req.user if verification is successful
        req.user = user || undefined; // Ensure user is assigned or undefined if invalid
        // Proceed to the next middleware or route handler
        next();
    });
};
exports.default = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map