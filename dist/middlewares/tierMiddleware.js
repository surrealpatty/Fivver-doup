"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTier = void 0;
// Middleware to check if the user has the required tier
const checkTier = (tier) => {
    return (req, res, next) => {
        var _a;
        // Check if the user exists and if the user has the required tier
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.tier) !== tier) {
            res.status(403).json({ message: 'Forbidden: You need to be on the appropriate tier.' });
            return; // Stop further processing, but do not return a value
        }
        // If tier matches, proceed to the next middleware/handler
        next();
    };
};
exports.checkTier = checkTier;
