"use strict";
// src/types/UserRoles.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTier = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "admin";
    UserRole["User"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserTier;
(function (UserTier) {
    UserTier["Free"] = "free";
    UserTier["Paid"] = "paid";
})(UserTier || (exports.UserTier = UserTier = {}));
