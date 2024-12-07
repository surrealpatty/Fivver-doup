"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
var checkRole = function (requiredRole) {
    return function (req, res, next) {
        var user = req.user;
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
