"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTier = void 0;
/**
 * Middleware to restrict access based on user tier.
 * @param requiredTier The required tier for access (e.g., "paid").
 */
const checkTier = (requiredTier) => {
    return (req, res, next) => {
        // Check if the user's tier matches the required tier
        if (req.user?.tier !== requiredTier) {
            res.status(403).json({ message: `Access restricted to ${requiredTier} users only.` });
            return; // Explicitly return after sending a response
        }
        next();
    };
};
exports.checkTier = checkTier;
//# sourceMappingURL=tierMiddleware.js.map