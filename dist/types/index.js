"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
// Type guard function to check if req.user is a UserPayload
function isUser(user) {
    return user && typeof user.id === 'string' && typeof user.tier === 'string'; // Check that 'id' and 'tier' exist
}
//# sourceMappingURL=index.js.map