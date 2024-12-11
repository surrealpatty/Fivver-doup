"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailService_1 = require("../services/emailService"); // Correct import for named export
const router = (0, express_1.Router)();
// Endpoint to trigger email sending
router.get('/test-email', async (req, res, next) => {
    try {
        // Example email details (replace with actual test data)
        const emailDetails = {
            to: 'test@example.com',
            subject: 'Test Email',
            text: 'This is a test email sent from the email service.',
        };
        // Call your sendEmail function
        await (0, emailService_1.sendEmail)(emailDetails);
        // Send a success response
        res.status(200).json({ message: 'Test email sent successfully!' });
    }
    catch (error) {
        console.error('Error sending email:', error);
        // Pass the error to the next middleware (e.g., error handling middleware)
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=testEmailRoute.js.map