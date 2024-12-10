"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tierMiddleware = void 0;
const tierMiddleware = (req, res, next) => {
    const user = req.user;
    if (!user || user.tier !== 'paid') {
        return res.status(403).json({ message: 'Access restricted to paid users only.' });
    }
    next(); // Allow access if the user is paid
};
exports.tierMiddleware = tierMiddleware;
//# sourceMappingURL=tierRestriction.js.map