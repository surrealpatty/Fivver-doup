// src/controllers/profileController.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerUser", {
    enumerable: true,
    get: function() {
        return registerUser;
    }
});
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _user = require("../models/user");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const registerUser = async ({ username, email, password })=>{
    try {
        // Hash the password before saving it
        const hashedPassword = await _bcryptjs.default.hash(password, 10);
        const userData = {
            username: 'newuser',
            email: 'user@example.com',
            role: 'free',
            password: hashedPassword
        };
        // Create the user with hashed password
        const user = await _user.User.create(userData);
        return user; // Return the created user object
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error registering user: ' + error.message); // Return specific error message
        }
        throw new Error('Unknown error occurred during user registration'); // Fallback error message
    }
};

//# sourceMappingURL=profileController.js.map