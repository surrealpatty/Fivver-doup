"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const router = (0, express_1.Router)();
// Define the protected route with authentication
router.get('/protected-route', authenticateToken_1.default, // Use the authenticateToken middleware
async (req, // Ensure correct typing for req using CustomAuthRequest
res, next) => {
    try {
        // Ensure req.user is available, as it's injected by authenticateToken middleware
        if (!req.user) {
            // Return early if user is not present
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { id, email, username } = req.user;
        // Return a response with user data
        return res.status(200).json({
            message: 'Protected route accessed',
            user: { id, email, username },
        });
    }
    catch (error) { // Explicitly type the error as 'any' or 'Error'
        // Return error response instead of calling next(error)
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});
exports.default = router;
