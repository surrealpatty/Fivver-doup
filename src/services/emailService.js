"use strict";
// src/services/emailService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Create a transporter object using SMTP transport (Gmail in this case)
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail', // You can change this to another email service if needed
    auth: {
        user: process.env.EMAIL_USER, // Your email address from the .env file
        pass: process.env.EMAIL_PASSWORD, // Your email password or application-specific password from .env
    },
});
// Define the sendEmail function to send emails
const sendEmail = (emailDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Set up email options
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender's email
            to: emailDetails.to, // Recipient's email
            subject: emailDetails.subject, // Subject of the email
            text: emailDetails.text, // Email body text
        };
        // Send the email and return the result
        const info = yield transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw the error to be handled in the route or elsewhere
    }
});
exports.sendEmail = sendEmail;
