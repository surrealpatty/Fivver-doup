"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resetPassword", {
    enumerable: true,
    get: function() {
        return resetPassword;
    }
});
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const resetPassword = async (req, res, next)=>{
    try {
        const { email, newPassword } = req.body;
        // Find the user by email
        const user = await _user.default.findOne({
            where: {
                email
            }
        });
        if (!user) {
            res.status(404).json({
                message: 'User not found.'
            });
            return; // Ensure no further code is executed
        }
        // Hash the new password
        const hashedPassword = await _bcryptjs.default.hash(newPassword, 10);
        // Update the user's password
        await user.update({
            password: hashedPassword
        });
        // Send a success response
        res.status(200).json({
            message: 'Password reset successful.'
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error resetting password:', error.message);
            res.status(500).json({
                message: 'Server error during password reset.',
                error: error.message
            });
        } else {
            console.error('Unknown error during password reset:', error);
            res.status(500).json({
                message: 'Unknown server error'
            });
        }
        // Ensure the error is passed to the next middleware
        next(error);
    }
};
