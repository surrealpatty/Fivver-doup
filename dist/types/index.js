"use strict";
// src/types/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
function isUser(req) {
    return req.user !== undefined; // Explicitly check for undefined
}
//# sourceMappingURL=index.js.map