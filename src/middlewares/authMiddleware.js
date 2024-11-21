"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
// Authentication middleware to verify JWT token
var authenticateToken = function (req, res, next) {
    var _a;
    // Extract the token from the Authorization header (Bearer token)
    var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    var jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({ message: 'Server configuration error: Missing JWT_SECRET' });
    }
    try {
        // Verify and decode the JWT token
        var decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        // Attach the `userId` to the request object
        req.userId = decoded.userId;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticateToken = authenticateToken;
