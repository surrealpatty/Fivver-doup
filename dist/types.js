"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
// Define the isUser type guard to validate UserPayload
function isUser(user) {
    return user && typeof user.id === 'string'; // Check that 'user.id' is a string (more checks can be added if needed)
}
//# sourceMappingURL=types.js.map