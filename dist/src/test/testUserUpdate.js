"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const testUpdateUser = async (userId)=>{
    try {
        const updatedUser = await _user.default.update({
            username: 'updatedusername'
        }, {
            where: {
                id: userId
            }
        } // Adjust according to your primary key or identifier
        );
        console.log('User updated:', updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
    }
};
// Replace 1 with an actual user ID from your database
testUpdateUser(1);
