"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to authenticate JWT and attach user info to the request
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }
    // Verify the token using the secret key
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        // Attach the user object to the request, ensuring 'tier' is included
        req.user = {
            id: decoded?.id,
            email: decoded?.email,
            username: decoded?.username,
            tier: decoded?.tier, // Include the 'tier' field from the decoded JWT payload
        };
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authenticateJWT.js.map