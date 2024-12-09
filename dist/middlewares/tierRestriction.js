"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPaidTier = void 0;
const checkPaidTier = (req, res, next) => {
    if (req.user.tier !== 'paid') {
        return res.status(403).json({ message: 'Access restricted to paid tier users.' });
    }
    next();
};
exports.checkPaidTier = checkPaidTier;
