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
// Middleware to check the role of the user
const checkRole = (requiredRole)=>{
    return (req, res, next)=>{
        const user = req.user; // Now `user` should always exist and have the `role`
        if (!user || !user.role) {
            return res.status(403).json({
                message: 'User role is missing or not authorized'
            });
        }
        if (user.role !== requiredRole) {
            return res.status(403).json({
                message: 'Forbidden: Insufficient role'
            });
        }
        next(); // Proceed if the user has the correct role
    };
};

//# sourceMappingURL=roleMiddleware.js.map