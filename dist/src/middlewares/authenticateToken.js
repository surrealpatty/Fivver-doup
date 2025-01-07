"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jwt_1 = require("../utils/jwt"); // Import the verifyToken function from the utils
// Middleware to authenticate token and attach user data to the request
const authenticateToken = (req, // Extending the Request type with the optional user property
res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Extract the token from "Bearer <token>"
    if (!token) {
        // If token is missing, send an error response
        return res.status(401).json({ message: 'Access token is missing.' });
    }
    // Verify the token using the utility function
    const decoded = (0, jwt_1.verifyToken)(token);
    if (!decoded) {
        // If token verification fails, send an error response
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    // Attach the decoded user payload to the request object
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
};
exports.authenticateToken = authenticateToken;
