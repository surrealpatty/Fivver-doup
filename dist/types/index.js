"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
// Define a type guard to validate UserPayload
function isUser(user) {
    return (user &&
        typeof user.id === 'string' &&
        typeof user.email === 'string' &&
        typeof user.username === 'string' &&
        typeof user.password === 'string' &&
        typeof user.role === 'string' &&
        typeof user.tier === 'string' &&
        typeof user.isVerified === 'boolean' &&
        (user.resetToken === null || typeof user.resetToken === 'string') &&
        (user.resetTokenExpiration === null || user.resetTokenExpiration instanceof Date)); // Check that all required fields exist with the correct types
}
//# sourceMappingURL=index.js.map