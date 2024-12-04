"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTier = void 0;
// Middleware to check the user's tier
const checkTier = (requiredTier) => {
    return (req, res, next) => {
        if (!req.user || req.user.tier !== requiredTier) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }
        next(); // Proceed to the next middleware or route handler
    };
};
exports.checkTier = checkTier;
//# sourceMappingURL=tierMiddleware.js.map