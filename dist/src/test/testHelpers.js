// src/test/testHelpers.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createMockUserToken", {
    enumerable: true,
    get: function() {
        return createMockUserToken;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const createMockUserToken = (userId)=>{
    const payload = {
        id: userId,
        email: 'user@example.com',
        username: 'username'
    };
    const secretKey = 'your-secret-key'; // Use your secret key, replace with actual one for testing
    // Create the token with the payload and secret key
    const token = _jsonwebtoken.default.sign(payload, secretKey, {
        expiresIn: '1h'
    });
    return token;
};
