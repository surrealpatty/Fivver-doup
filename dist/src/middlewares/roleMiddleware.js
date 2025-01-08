// src/middlewares/roleMiddleware.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "checkRole", {
    enumerable: true,
    get: function() {
        return checkRole;
    }
});
const checkRole = (requiredRole, requiredTier)=>{
    return (req, res, next)=>{
        const user = req.user; // `user` is populated by the authenticateToken middleware
        // Ensure the user is authenticated and exists
        if (!user) {
            res.status(401).json({
                message: 'User not authenticated'
            });
            return; // Ensure no further code is executed
        }
        // Check if the user has the required tier
        if (user.tier !== requiredTier) {
            res.status(403).json({
                message: `Forbidden: ${requiredTier} tier required`
            });
            return; // Ensure no further code is executed
        }
        // Check if the user has the required role
        if (user.role !== requiredRole) {
            res.status(403).json({
                message: `Forbidden: ${requiredRole} role required`
            });
            return; // Ensure no further code is executed
        }
        // Proceed to the next middleware or route handler if the user has the required role and tier
        next(); // Continue to the next middleware or route handler
    };
};
