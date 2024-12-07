"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
// Example middleware to check if user is authenticated
var getUserProfile = function (req, res, next) {
    var user = req.user; // `req.user` is of type `UserPayload`
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized, no user found' });
    }
    // Safe to access user properties like user.id, user.email
    res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        tier: user.tier,
    });
};
exports.getUserProfile = getUserProfile;
