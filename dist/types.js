"use strict";
// src/types.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTier = exports.UserRole = void 0;
exports.isUser = isUser;
// Define UserRole enum for user's role (user, admin, moderator)
var UserRole;
(function (UserRole) {
    UserRole["User"] = "user";
    UserRole["Admin"] = "admin";
    UserRole["Moderator"] = "moderator";
})(UserRole || (exports.UserRole = UserRole = {}));
// Define UserTier enum for user's subscription tier (free or paid)
var UserTier;
(function (UserTier) {
    UserTier["Free"] = "free";
    UserTier["Paid"] = "paid";
})(UserTier || (exports.UserTier = UserTier = {}));
// Type guard to check if the user is a valid UserPayload
function isUser(user) {
    return (user &&
        typeof user.id === 'string' &&
        (user.email === undefined || typeof user.email === 'string') &&
        (user.username === undefined || typeof user.username === 'string') &&
        Object.values(UserRole).includes(user.role) && // Ensuring role is valid
        Object.values(UserTier).includes(user.tier) // Ensuring tier is valid
    );
}
