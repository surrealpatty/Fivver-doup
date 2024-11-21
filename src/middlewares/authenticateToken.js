"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
// Named export for authenticateToken middleware
var authenticateToken = function (req, res, next) {
    var _a;
    // Extract token from 'Authorization' header (Assuming format: 'Bearer <token>')
    var token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }
    var jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({ message: 'Server configuration error: Missing JWT_SECRET' });
    }
    try {
        // Verify the token using JWT secret
        var decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        // Attach the decoded user data to the request object
        req.user = {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username,
        };
        // Call next middleware or route handler
        next();
    }
    catch (error) {
        // Log the error for debugging, but do not expose the full error to the client
        console.error('Token verification failed:', error);
        // Return a generic error message
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
