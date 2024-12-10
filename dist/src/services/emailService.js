// src/services/emailService.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sendEmail", {
    enumerable: true,
    get: function() {
        return sendEmail;
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

//# sourceMappingURL=emailService.js.map