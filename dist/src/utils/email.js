"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = exports.sendPasswordResetEmail = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Create a transporter object using Gmail service and credentials from environment variables
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Sender's Gmail address from environment variables
        pass: process.env.GMAIL_PASS, // Sender's Gmail password or app-specific password from environment variables
    },
});
// Function to send a general email (can be reused for verification and reset)
const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.GMAIL_USER, // Sender address
            to, // Recipient address
            subject, // Subject line
            text, // Plain text body
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};
exports.sendEmail = sendEmail;
// Function to send the password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
    try {
        const resetUrl = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `Please click the following link to reset your password: ${resetUrl}`,
        };
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to ${email}`);
    }
    catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Error sending password reset email');
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
// Optionally, you can add more functions for other email types (like registration verification)
const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const verificationUrl = `${process.env.BASE_URL}/verify?token=${verificationToken}`;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Email Verification',
            text: `Please click the following link to verify your email: ${verificationUrl}`,
        };
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    }
    catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Error sending verification email');
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
