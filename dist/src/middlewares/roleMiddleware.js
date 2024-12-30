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
const checkRole = (requiredRole)=>{
    return (req, res, next)=>{
        const user = req.user; // `user` will be populated by authenticateToken middleware
        // Ensure the user is authenticated and has the role
        if (!user) {
            res.status(401).json({
                message: 'User not authenticated'
            }); // Send response and exit middleware
            return; // Ensure no further processing occurs after sending the response
        }
        // Check if the user has the required tier
        if (requiredRole === 'paid' && user.tier !== 'paid') {
            res.status(403).json({
                message: 'Forbidden: Paid tier required'
            }); // Send response and exit middleware
            return; // Ensure no further processing occurs after sending the response
        }
        // Check if the user has the required role
        if (requiredRole === 'admin' && user.role !== 'admin') {
            res.status(403).json({
                message: 'Forbidden: Admin role required'
            }); // Send response and exit middleware
            return; // Ensure no further processing occurs after sending the response
        }
        // Proceed to the next middleware or route handler if the user has the required role and tier
        next(); // No need to return anything, just call next() to proceed
    };
};

//# sourceMappingURL=roleMiddleware.js.map