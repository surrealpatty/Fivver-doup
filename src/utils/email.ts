import nodemailer from 'nodemailer';

// Create a transporter using the Gmail service and your credentials from the environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,  // Your Gmail address
    pass: process.env.GMAIL_PASS,  // Your Gmail password or app-specific password
  },
});

// Function to send email
const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER, // Sender address
      to, // Recipient address
      subject, // Subject line
      text, // Plain text body
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
