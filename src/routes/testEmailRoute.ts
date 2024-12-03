import { Router, Request, Response } from 'express';
import { sendEmail } from '../services/emailService';  // Correct import for named export

const router = Router();

// Endpoint to trigger email sending
router.get('/test-email', async (req: Request, res: Response) => {
  try {
    // Example email details (replace with actual test data)
    const emailDetails = {
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email sent from the email service.',
    };

    // Call your sendEmail function
    await sendEmail(emailDetails);

    res.status(200).json({ message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending test email.' });
  }
});

export default router;
