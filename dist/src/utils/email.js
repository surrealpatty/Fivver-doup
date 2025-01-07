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
    sendEmail: function() {
        return sendEmail;
    },
    sendPasswordResetEmail: function() {
        return sendPasswordResetEmail;
    },
    sendVerificationEmail: function() {
        return sendVerificationEmail;
    }
});
const _nodemailer = /*#__PURE__*/ _interop_require_default(require("nodemailer"));
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Load environment variables from .env file
_dotenv.default.config();
// Create a transporter object using Gmail service and credentials from environment variables
const transporter = _nodemailer.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});
const sendEmail = async (to, subject, text)=>{
    try {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to,
            subject,
            text
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};
const sendPasswordResetEmail = async (email, resetToken)=>{
    try {
        const resetUrl = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `Please click the following link to reset your password: ${resetUrl}`
        };
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to ${email}`);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Error sending password reset email');
    }
};
const sendVerificationEmail = async (email, verificationToken)=>{
    try {
        const verificationUrl = `${process.env.BASE_URL}/verify?token=${verificationToken}`;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Email Verification',
            text: `Please click the following link to verify your email: ${verificationUrl}`
        };
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Error sending verification email');
    }
};
