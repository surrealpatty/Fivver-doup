"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
// Define a type guard to validate UserPayload
function isUser(user) {
    return user && typeof user.id === 'string'; // Check that 'user.id' is a string (you can add more checks if necessary)
}
//# sourceMappingURL=index.js.map