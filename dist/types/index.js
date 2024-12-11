"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserPayload = isUserPayload;
// Type guard to check if a user is of type UserPayload
function isUserPayload(user) {
    return user && typeof user.id === 'string' && typeof user.tier === 'string';
}
//# sourceMappingURL=index.js.map