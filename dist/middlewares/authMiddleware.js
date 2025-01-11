"use strict";
// src/middlewares/authMiddleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
/**
 * Middleware to ensure the user is authenticated.
 * Checks if the user property exists on the request object, which is set by the authenticateToken middleware.
 */
const authenticateUser = (req, res, next) => {
    if (!req.user) {
        // If the user is not authenticated, respond with a 401 status
        res.status(401).json({ error: 'Unauthorized' });
        return; // Ensure the function returns early
    }
    // If the user is authenticated, proceed to the next middleware or route handler
    next();
};
exports.authenticateUser = authenticateUser;
