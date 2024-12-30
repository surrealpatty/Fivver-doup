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
const testDeleteUser = async (userId)=>{
    try {
        const deletedUser = await _user.default.destroy({
            where: {
                id: userId
            }
        });
        if (deletedUser) {
            console.log(`User with ID ${userId} deleted successfully.`);
        } else {
            console.log(`No user found with ID ${userId}.`);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};
// Replace with a valid user ID
testDeleteUser(1);

//# sourceMappingURL=testUserDelete.js.map