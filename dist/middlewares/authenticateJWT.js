"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
// Middleware to authenticate JWT and attach user info to the request
var authenticateJWT = function (req, res, next) {
    var _a;
    var token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract token from Authorization header
    // If no token is provided, return a 403 response
    if (!token) {
        res.status(403).json({ message: 'No token provided.' });
        return; // Ensure that the middleware stops execution
    }
    // Verify the token using the secret key (this is a synchronous check)
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            res.status(403).json({ message: 'Invalid token.' });
            return; // Ensure that the middleware stops execution
        }
        // Attach the user object to the request, ensuring 'tier' is included
        req.user = {
            id: decoded.id, // Explicit cast to JwtPayload
            email: decoded.email,
            username: decoded.username,
            tier: decoded.tier, // Include 'tier' from the JWT payload
        };
        next(); // Proceed to the next middleware or route handler
    });
};
exports.authenticateJWT = authenticateJWT;
