// src/types.ts
// Define UserRole enum for user's role (user, admin, moderator)
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    UserRole: function() {
        return UserRole;
    },
    UserTier: function() {
        return UserTier;
    },
    isUser: function() {
        return isUser;
    }
});
var UserRole = /*#__PURE__*/ function(UserRole) {
    UserRole["User"] = "user";
    UserRole["Admin"] = "admin";
    UserRole["Moderator"] = "moderator";
    return UserRole;
}({});
var UserTier = /*#__PURE__*/ function(UserTier) {
    UserTier["Free"] = "free";
    UserTier["Paid"] = "paid";
    return UserTier;
}({});
function isUser(user) {
    return user && typeof user.id === 'string' && (user.email === undefined || typeof user.email === 'string') && (user.username === undefined || typeof user.username === 'string') && Object.values(UserRole).includes(user.role) && // Ensuring role is valid
    Object.values(UserTier).includes(user.tier) // Ensuring tier is valid
    ;
}
