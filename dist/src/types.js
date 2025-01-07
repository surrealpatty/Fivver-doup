"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
// Define a type guard to check if an object is a valid UserPayload
function isUser(user) {
    return (user &&
        typeof user.id === 'string' &&
        (user.email === undefined || typeof user.email === 'string') &&
        (user.username === undefined || typeof user.username === 'string') &&
        (user.role === undefined || ['admin', 'paid', 'user'].includes(user.role)) && // Check if role is valid
        (user.tier === undefined || ['free', 'paid'].includes(user.tier)) // Check if tier is valid
    );
}
