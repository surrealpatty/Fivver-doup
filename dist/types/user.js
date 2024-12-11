"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
// Define the type guard to check if the user is present
function isUser(req) {
    return req.user !== undefined; // Explicitly check for undefined
}
//# sourceMappingURL=user.js.map