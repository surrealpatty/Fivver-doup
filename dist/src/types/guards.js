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
    return typeof user === 'object' && user !== null && typeof user.id === 'string' && typeof user.email === 'string';
}
