"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTier = checkTier;
function checkTier(tier) {
    return (req, res, next) => {
        if (req.user?.tier !== tier) {
            res.status(403).json({ message: 'Insufficient tier' }); // Error response
        }
        else {
            next(); // Move to next middleware if check passes
        }
    };
}
//# sourceMappingURL=tierMiddleware.js.map