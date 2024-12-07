"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
// Middleware to authenticate JWT and attach the decoded user to the request object
var authenticateJWT = function (req, res, next) {
    var _a;
    var token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Token is expected as "Bearer <token>"
    // If no token is provided, respond with a 401 Unauthorized error
    if (!token) {
        return res.status(401).json({ message: 'No token provided' }); // Returning Response here is fine
    }
    // Verify the token and decode it
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).json({ message: 'Token is invalid' }); // Returning Response here is fine
        }
        // Attach the decoded user payload to the request object (req.user)
        req.user = decoded; // Cast decoded object to AuthRequest['user'] type
        next(); // Proceed to the next middleware or route handler
    });
};
exports.authenticateJWT = authenticateJWT;
