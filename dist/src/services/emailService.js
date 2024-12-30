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
    sendResetEmail: function() {
        return sendResetEmail;
    }
});
const _nodemailer = /*#__PURE__*/ _interop_require_default(require("nodemailer"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Create a transporter object using SMTP transport (Gmail in this case)
const transporter = _nodemailer.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
const sendEmail = async (emailDetails)=>{
    try {
        // Set up email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailDetails.to,
            subject: emailDetails.subject,
            text: emailDetails.text
        };
        // Send the email and return the result
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw the error to be handled in the route or elsewhere
    }
};
const sendResetEmail = async (email, token)=>{
    const resetUrl = `http://your-frontend-url/reset-password?token=${token}`; // Customize the reset URL as needed
    const emailDetails = {
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`
    };
    try {
        // Send the reset email
        await sendEmail(emailDetails);
        console.log('Password reset email sent');
    } catch (error) {
        console.error('Error sending reset email:', error);
        throw new Error('Failed to send reset email');
    }
};

//# sourceMappingURL=emailService.js.map