// Import necessary dependencies
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
const createMockUserToken = (user)=>{
    return _jsonwebtoken.default.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, 'your_secret_key', {
        expiresIn: '1h'
    } // Token expiration time
    );
};
