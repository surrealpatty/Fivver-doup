"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _UserRoles = require("../types/UserRoles");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const testDuplicateUsername = async ()=>{
    try {
        // First user creation with all required properties
        const user1 = await _user.default.create({
            username: 'duplicateuser',
            email: 'user1@example.com',
            password: 'password1',
            role: _UserRoles.UserRole.User,
            tier: _UserRoles.UserTier.Free,
            isVerified: false
        });
        console.log('First user created:', user1);
        // Attempt to create another user with the same username
        const user2 = await _user.default.create({
            username: 'duplicateuser',
            email: 'user2@example.com',
            password: 'password2',
            role: _UserRoles.UserRole.User,
            tier: _UserRoles.UserTier.Free,
            isVerified: false
        });
        console.log('Second user created:', user2);
    } catch (error) {
        console.error('Error creating user (duplicate username):', error);
    }
};
testDuplicateUsername();
