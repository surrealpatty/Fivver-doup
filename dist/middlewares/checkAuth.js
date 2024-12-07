"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
var jsonwebtoken_1 = require("jsonwebtoken"); // You can use jsonwebtoken for verifying JWT tokens
// Secret key for JWT verification, you should store it in an environment variable for security
var SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with your actual secret key
// Middleware to check if the user is authenticated
var checkAuth = function (req, res, next) {
    var _a;
    var token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Assuming token is passed as "Bearer token"
    if (!token) {
        res.status(401).json({ message: 'Authorization token is missing' });
        return; // Ensure function returns when response is sent
    }
    try {
        // Verify the token
        var decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        // Attach user information to the request object for further use in the route
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return; // Ensure function returns when response is sent
    }
};
exports.checkAuth = checkAuth;
