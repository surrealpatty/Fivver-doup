"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
// Define the isUser type guard
function isUser(user) {
    return user && typeof user.id === 'string'; // Check that 'user.id' is a string, more checks can be added
}
//# sourceMappingURL=index.js.map