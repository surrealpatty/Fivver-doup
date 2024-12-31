import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
// Create a transporter object using Gmail service and credentials from environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Sender's Gmail address from environment variables
        pass: process.env.GMAIL_PASS, // Sender's Gmail password or app-specific password from environment variables
    },
});
// Function to send a general email (can be reused for verification and reset)
export const sendEmail = async (to, subject, text) => {
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
// Function to send the password reset email
export const sendPasswordResetEmail = async (email, resetToken) => {
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
// Optionally, you can add more functions for other email types (like registration verification)
export const sendVerificationEmail = async (email, verificationToken) => {
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
//# sourceMappingURL=email.js.map