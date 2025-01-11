"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jwt_1 = require("../utils/jwt"); // Import the verifyToken function from the utils
// Middleware to authenticate token and attach user data to the request
const authenticateToken = async (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Extract the token from "Bearer <token>"
    if (!token) {
        // If token is missing, send an error response
        res.status(401).json({ message: 'Access token is missing.' });
        return; // Exit function after sending the response
    }
    try {
        // Verify the token using the utility function
        const decoded = (0, jwt_1.verifyToken)(token); // Assuming `verifyToken` returns decoded user payload
        // If verification fails or decoded is undefined, send an error response
        if (!decoded) {
            res.status(403).json({ message: 'Invalid or expired token.' });
            return; // Exit function after sending the response
        }
        // Attach the decoded user payload to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        // Catch any unexpected errors during token verification
        console.error('Token verification error:', error);
        res.status(500).json({ message: 'Token verification failed. Please try again later.' });
    }
};
exports.authenticateToken = authenticateToken;
