"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
// Type guard to check if a user is a UserPayload
function isUser(user) {
    return user && typeof user.id === 'string'; // Check that 'user.id' is a string (you can add more checks if needed)
}
//# sourceMappingURL=types.js.map