"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailService_1 = require("../services/emailService"); // Correct import for named export
const router = (0, express_1.Router)();
// Endpoint to trigger email sending
router.get('/test-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Example email details (replace with actual test data)
        const emailDetails = {
            to: 'test@example.com',
            subject: 'Test Email',
            text: 'This is a test email sent from the email service.',
        };
        // Call your sendEmail function
        yield (0, emailService_1.sendEmail)(emailDetails);
        res.status(200).json({ message: 'Test email sent successfully!' });
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending test email.' });
    }
}));
exports.default = router;
