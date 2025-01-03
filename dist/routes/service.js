"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import required types
const authenticateToken_1 = require("../middlewares/authenticateToken"); // Middleware for token verification
const router = express_1.default.Router();
// Example middleware to check user roles
const checkRole = (role) => {
    return (req, res, next) => {
        const user = req.user; // Type the user as UserPayload
        const userRole = user.role; // Now TypeScript knows that user has a 'role' property
        if (userRole !== role) {
            return res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
        }
        next();
    };
};
// Premium service route for paid users only
router.get('/premium', authenticateToken_1.authenticateToken, checkRole('Paid'), (req, res) => {
    res.status(200).json({ message: 'Premium service access granted.' });
});
exports.default = router;
