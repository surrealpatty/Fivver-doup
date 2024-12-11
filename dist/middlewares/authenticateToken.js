"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Assuming you're using JWT for token authentication
// Middleware to authenticate the token and add the user to the request
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming a Bearer token
    if (!token) {
        // If no token, return Unauthorized
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // Verify the token with JWT
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // If token verification fails, return Forbidden
            return res.status(403).json({ message: 'Forbidden' });
        }
        // Assign the user to the request object (could be undefined if invalid)
        req.user = user || undefined;
        // Pass to the next middleware
        next();
    });
};
exports.default = authenticateToken;
//# sourceMappingURL=authenticateToken.js.map