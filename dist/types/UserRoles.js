"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTier = exports.UserRole = void 0;
// Define UserRole enum to represent user roles like 'user', 'admin'
var UserRole;
(function (UserRole) {
    UserRole["User"] = "user";
    UserRole["Admin"] = "admin";
    UserRole["Moderator"] = "moderator";
})(UserRole || (exports.UserRole = UserRole = {}));
// Define UserTier enum to represent subscription tiers like 'free' and 'paid'
var UserTier;
(function (UserTier) {
    UserTier["Free"] = "free";
    UserTier["Paid"] = "paid";
})(UserTier || (exports.UserTier = UserTier = {}));
