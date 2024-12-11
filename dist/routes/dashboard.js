"use strict";
// src/types/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
// Helper type guard to check if user exists
function isUser(req) {
    return !!req.user;
}
//# sourceMappingURL=dashboard.js.map