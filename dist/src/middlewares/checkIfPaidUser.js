"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware to check if the user is a paid user
const checkIfPaidUser = (req, res, next) => {
    const user = req.user; // Assuming the user is attached to the request
    // Check if the user exists and has the tier set to 'paid'
    if (user && user.tier === 'paid') {
        return next(); // User is paid, continue to the route handler
    }
    // If the user is not paid or not authenticated, return a 403 Forbidden response
    return res.status(403).json({ message: 'Access forbidden for free users.' });
};
exports.default = checkIfPaidUser;
