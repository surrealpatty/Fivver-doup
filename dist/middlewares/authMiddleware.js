"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to authenticate JWT and attach the decoded user to the request object
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Token is expected as "Bearer <token>"
    // If no token is provided, respond with a 401 Unauthorized error
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    // Verify the token and decode it
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is invalid' }); // Token is invalid
        }
        // Attach the decoded user payload to the request object (req.user)
        req.user = decoded; // Cast decoded object to AuthRequest['user'] type
        next(); // Proceed to the next middleware or route handler
    });
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authMiddleware.js.map