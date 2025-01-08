"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _emailService = require("../services/emailService");
const router = (0, _express.Router)();
// Endpoint to trigger email sending
router.get('/test-email', async (req, res, next)=>{
    try {
        // Example email details (replace with actual test data)
        const emailDetails = {
            to: 'test@example.com',
            subject: 'Test Email',
            text: 'This is a test email sent from the email service.'
        };
        // Call your sendEmail function
        await (0, _emailService.sendEmail)(emailDetails);
        // Send a success response
        res.status(200).json({
            message: 'Test email sent successfully!'
        });
    } catch (error) {
        console.error('Error sending email:', error);
        // Pass the error to the next middleware (e.g., error handling middleware)
        next(error);
    }
});
const _default = router;
