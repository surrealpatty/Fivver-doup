"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
// Define the isUser type guard
function isUser(user) {
    return user && typeof user.id === 'string'; // Add more checks as needed
}
//# sourceMappingURL=index.js.map