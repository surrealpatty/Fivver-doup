"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTier = void 0;
// Middleware to check if the user has the required tier
const checkTier = (tier) => {
    return (req, res, next) => {
        // Check if the user exists and if the user has the required tier
        if (req.user?.tier !== tier) {
            return res.status(403).json({ message: 'Forbidden: You need to be on the appropriate tier.' });
        }
        // If tier matches, proceed to the next middleware/handler
        next();
    };
};
exports.checkTier = checkTier;
//# sourceMappingURL=tierMiddleware.js.map