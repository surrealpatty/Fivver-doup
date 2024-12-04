"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTier = checkTier;
function checkTier(tier) {
    return (req, res, next) => {
        if (req.user?.tier !== tier) {
            return res.status(403).json({ message: 'Insufficient tier' });
        }
        next();
    };
}
//# sourceMappingURL=tierMiddleware.js.map