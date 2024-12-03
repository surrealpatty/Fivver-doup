// src/routes/user.ts

import { Router, Request, Response } from 'express';
import { sendEmail } from '../services/emailService';  // Correctly import the sendEmail function

const router = Router();

// Existing user routes (e.g., registration, login) can be placed here

// Add the test email route
router.get('/test-email', async (req: Request, res: Response) => {
  try {
    const emailDetails = {
      to: 'test@example.com',  // Use a valid email address for testing
      subject: 'Test Email',
      text: 'This is a test email sent from the email service.',
    };

    // Call the sendEmail function to send the email
    await sendEmail(emailDetails);

    res.status(200).json({ message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending test email.' });
  }
});

// Other user-related routes (like registration, login) would go here

export default router;
