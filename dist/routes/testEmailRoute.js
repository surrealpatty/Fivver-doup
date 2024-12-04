"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailService_1 = require("../services/emailService"); // Correct import for named export
const router = (0, express_1.Router)();
// Endpoint to trigger email sending
router.get('/test-email', async (req, res) => {
    try {
        // Example email details (replace with actual test data)
        const emailDetails = {
            to: 'test@example.com',
            subject: 'Test Email',
            text: 'This is a test email sent from the email service.',
        };
        // Call your sendEmail function
        await (0, emailService_1.sendEmail)(emailDetails);
        res.status(200).json({ message: 'Test email sent successfully!' });
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending test email.' });
    }
});
exports.default = router;
//# sourceMappingURL=testEmailRoute.js.map