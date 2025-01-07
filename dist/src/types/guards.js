"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
// Type guard to ensure req.user is of type UserPayload
function isUser(user) {
    return typeof user === 'object' && user !== null && typeof user.id === 'string' && typeof user.email === 'string';
}
