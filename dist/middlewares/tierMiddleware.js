"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTier = void 0;
/**
 * Middleware to restrict access based on user tier.
 * @param requiredTier The required tier for access (e.g., "paid").
 */
const checkTier = (requiredTier) => {
    return (req, res, next) => {
        if (req.user?.tier !== requiredTier) {
            res.status(403).json({ message: `Access restricted to ${requiredTier} users only.` });
            return;
        }
        next();
    };
};
exports.checkTier = checkTier;
//# sourceMappingURL=tierMiddleware.js.map