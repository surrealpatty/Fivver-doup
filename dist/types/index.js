"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserPayload = isUserPayload;
// Type Guard to assert that 'req.user' is correctly typed as UserPayload
function isUserPayload(user) {
    return user && typeof user.id === 'string' && typeof user.tier === 'string';
}
//# sourceMappingURL=index.js.map