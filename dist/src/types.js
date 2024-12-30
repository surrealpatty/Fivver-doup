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
    return user && typeof user.id === 'string' && typeof user.email === 'string' && (user.username === undefined || typeof user.username === 'string') && (user.role === undefined || typeof user.role === 'string') && (user.tier === undefined || typeof user.tier === 'string');
}

//# sourceMappingURL=types.js.map