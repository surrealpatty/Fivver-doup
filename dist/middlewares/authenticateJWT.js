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
    // If no token is provided, return a 403 response
    if (!token) {
        res.status(403).json({ message: 'No token provided.' });
        return; // Ensure that the middleware stops execution
    }
    // Corrected jwt.verify usage, with options passed correctly
    const secretKey = process.env.JWT_SECRET;
    const options = { algorithms: ['HS256'] }; // Optional, based on your algorithm
    jsonwebtoken_1.default.verify(token, secretKey, options, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token.' });
            return; // Ensure that the middleware stops execution
        }
        // Ensure that decoded is not undefined
        if (decoded) {
            // Attach the user object to the request, ensuring 'tier' and 'role' are included
            req.user = {
                id: decoded.id, // Explicitly access properties from decoded JwtPayload
                email: decoded.email,
                username: decoded.username,
                tier: decoded.tier, // Include 'tier' from the JWT payload
                role: decoded.role, // Include 'role' from the JWT payload
            };
        }
        next(); // Proceed to the next middleware or route handler
    });
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authenticateJWT.js.map