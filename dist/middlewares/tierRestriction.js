"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPaidTier = void 0;
// Middleware function to check the user's tier
const checkPaidTier = (req, res, next) => {
    // Ensure that req.user is defined before accessing its properties
    if (!req.user || req.user.tier !== 'paid') {
        return res.status(403).json({ message: 'Access restricted to paid tier users.' });
    }
    next();
};
exports.checkPaidTier = checkPaidTier;
//# sourceMappingURL=tierRestriction.js.map