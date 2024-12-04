"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTier = void 0;
// Example tier checking middleware
const checkTier = (tier) => {
    return (req, res, next) => {
        if (req.user?.tier !== tier) {
            return res.status(403).json({ message: `User is not a ${tier} tier` });
        }
        next();
    };
};
exports.checkTier = checkTier;
//# sourceMappingURL=tierMiddleware.js.map