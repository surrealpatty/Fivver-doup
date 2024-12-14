"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetEmail = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Create a transporter object using SMTP transport (Gmail in this case)
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail', // You can change this to another email service if needed
    auth: {
        user: process.env.EMAIL_USER, // Your email address from the .env file
        pass: process.env.EMAIL_PASSWORD, // Your email password or application-specific password from .env
    },
});
// Define the sendEmail function to send generic emails
const sendEmail = async (emailDetails) => {
    try {
        // Set up email options
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender's email
            to: emailDetails.to, // Recipient's email
            subject: emailDetails.subject, // Subject of the email
            text: emailDetails.text, // Email body text
        };
        // Send the email and return the result
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw the error to be handled in the route or elsewhere
    }
};
exports.sendEmail = sendEmail;
// Define the sendResetEmail function to send a password reset email
const sendResetEmail = async (email, token) => {
    const resetUrl = `http://your-frontend-url/reset-password?token=${token}`; // Customize the reset URL as needed
    const emailDetails = {
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`,
    };
    try {
        // Send the reset email
        await (0, exports.sendEmail)(emailDetails);
        console.log('Password reset email sent');
    }
    catch (error) {
        console.error('Error sending reset email:', error);
        throw new Error('Failed to send reset email');
    }
};
exports.sendResetEmail = sendResetEmail;
//# sourceMappingURL=emailService.js.map