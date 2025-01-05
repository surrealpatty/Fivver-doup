"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
// Middleware to check if the user is authenticated
const checkAuth = (req, // Extend the Request type to include 'user' property
res, next) => {
    // Ensure that req.user is present
    if (!req.user) {
        // Send a response if user is not found
        res.status(403).json({ message: 'Forbidden: No user found in request.' });
        return; // Ensure no further code is executed after response is sent
    }
    // Proceed to the next middleware or route handler
    next(); // This will allow the request to move to the next handler
};
exports.checkAuth = checkAuth;
