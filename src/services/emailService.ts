// src/services/emailService.ts

import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport (Gmail in this case)
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to another email service if needed
  auth: {
    user: process.env.EMAIL_USER, // Your email address from the .env file
    pass: process.env.EMAIL_PASSWORD, // Your email password or application-specific password from .env
  },
});

// Define the sendEmail function to send emails
export const sendEmail = async (emailDetails: { to: string, subject: string, text: string }) => {
  try {
    // Set up email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email
      to: emailDetails.to,         // Recipient's email
      subject: emailDetails.subject, // Subject of the email
      text: emailDetails.text,       // Email body text
    };

    // Send the email and return the result
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error to be handled in the route or elsewhere
  }
};
