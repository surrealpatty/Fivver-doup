"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTier = void 0;
const checkTier = (tier) => {
    return (req, res, next) => {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.tier) !== tier) {
            res.status(403).json({ message: 'Forbidden: You need to be on the appropriate tier.' });
            return;
        }
        next();
    };
};
exports.checkTier = checkTier;
