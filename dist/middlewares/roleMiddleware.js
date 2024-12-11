"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
// Middleware to check the role of the user
const checkRole = (requiredRole) => {
    return (req, res, next) => {
        const user = req.user; // Now `user` should always exist and have the `role`
        if (!user || !user.role) {
            return res.status(403).json({ message: 'User role is missing or not authorized' });
        }
        if (user.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }
        next(); // Proceed if the user has the correct role
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=roleMiddleware.js.map