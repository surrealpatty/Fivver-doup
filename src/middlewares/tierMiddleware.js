"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTier = checkTier;
function checkTier(tier) {
    return function (req, res, next) {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.tier) !== tier) {
            res.status(403).json({ message: 'Insufficient tier' }); // Error response
        }
        else {
            next(); // Move to next middleware if check passes
        }
    };
}
