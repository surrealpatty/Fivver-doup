"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPaidTier = void 0;
const checkPaidTier = (req, res, next) => {
    const user = req.user; // Assuming user is set by the authenticateJWT middleware
    if (!user || user.tier !== 'paid') {
        // Send a 403 response if the user does not have a paid tier
        res.status(403).json({ message: 'User does not have a paid tier.' });
        return; // Explicitly return here to stop execution
    }
    // If the user has a paid tier, move to the next middleware/handler
    next(); // Proceed to the next middleware
};
exports.checkPaidTier = checkPaidTier;
//# sourceMappingURL=tierMiddleware.js.map