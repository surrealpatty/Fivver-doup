// src/types/UserRoles.ts
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
    }
});
var UserRole = /*#__PURE__*/ function(UserRole) {
    UserRole["User"] = "user";
    UserRole["Admin"] = "admin";
    return UserRole;
}({});
var UserTier = /*#__PURE__*/ function(UserTier) {
    UserTier["Free"] = "free";
    UserTier["Paid"] = "paid";
    return UserTier;
}({});
