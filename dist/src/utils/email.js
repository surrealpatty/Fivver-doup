"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _nodemailer = /*#__PURE__*/ _interop_require_default(require("nodemailer"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Create a transporter using the Gmail service and your credentials from the environment variables
const transporter = _nodemailer.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});
// Function to send email
const sendEmail = async (to, subject, text)=>{
    try {
        const info = await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to,
            subject,
            text
        });
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
const _default = sendEmail;

//# sourceMappingURL=email.js.map