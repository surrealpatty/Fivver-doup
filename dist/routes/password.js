"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passwordController_1 = require("../controllers/passwordController");
const router = express_1.default.Router();
// Middleware function for password reset validation
const validatePasswordReset = (req, res, next) => {
    // Middleware logic (e.g., validate password reset data)
    if (!req.body.token || !req.body.newPassword) {
        // Send response directly here, but the return type must be void
        res.status(400).json({ message: 'Token and new password are required.' });
        return; // Ensure we exit the middleware after sending the response
    }
    // If everything is good, call next()
    next();
};
// Route for password reset
router.post('/reset', validatePasswordReset, passwordController_1.resetPassword);
exports.default = router;
