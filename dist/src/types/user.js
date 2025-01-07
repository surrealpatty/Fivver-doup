"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
// Type guard to check if user exists in the request
function isUser(req) {
    return req.user !== undefined; // Explicitly checks if user is set in the request
}
