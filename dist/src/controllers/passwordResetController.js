"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    requestPasswordReset: function() {
        return requestPasswordReset;
    },
    resetPassword: function() {
        return resetPassword;
    }
});
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _sequelize = require("sequelize");
const _emailService = require("../services/emailService");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const requestPasswordReset = async (req, res)=>{
    const { email } = req.body;
    try {
        // Find user by email
        const user = await _user.default.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        // Generate a password reset token (this should be unique and securely generated)
        const token = 'someGeneratedToken'; // Replace this with real token generation logic
        user.passwordResetToken = token;
        user.passwordResetTokenExpiry = new Date(Date.now() + 3600000); // Set token expiry to 1 hour
        await user.save();
        // Send the reset email (implement the sendResetEmail function to send actual emails)
        await (0, _emailService.sendResetEmail)(email, token);
        res.status(200).json({
            message: 'Password reset email sent'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};
const resetPassword = async (req, res)=>{
    const { token, newPassword } = req.body;
    try {
        // Find user by the token and check if the token is not expired
        const user = await _user.default.findOne({
            where: {
                passwordResetToken: token,
                passwordResetTokenExpiry: {
                    [_sequelize.Op.gt]: new Date()
                }
            }
        });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid or expired token'
            });
        }
        // Update the password
        user.password = newPassword;
        user.passwordResetToken = null; // Clear the token after use
        user.passwordResetTokenExpiry = null; // Clear the expiry date
        await user.save();
        res.status(200).json({
            message: 'Password has been reset'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

//# sourceMappingURL=passwordResetController.js.map