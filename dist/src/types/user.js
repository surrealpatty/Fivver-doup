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
function isUser(req) {
    return req.user !== undefined; // Explicitly checks if user is set in the request
}
