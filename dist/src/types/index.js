// src/types/index.ts
// Define the UserRole type for user roles (more specific than a string)
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isUser", {
    enumerable: true,
    get: function() {
        return isUser;
    }
});
function isUser(user) {
    return user && typeof user.id === 'string' && typeof user.email === 'string' && (user.username === undefined || typeof user.username === 'string') && (user.role === undefined || [
        'admin',
        'paid',
        'user'
    ].includes(user.role)) && // Check if role is valid
    (user.tier === undefined || [
        'free',
        'paid'
    ].includes(user.tier) // Check if tier is valid
    );
}
