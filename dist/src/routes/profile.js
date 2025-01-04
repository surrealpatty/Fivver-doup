"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const router = express_1.default.Router();
// GET /profile - Fetch profile information
router.get('/profile', authenticateToken_1.default, // Middleware to authenticate user
async (req, res, next) => {
    try {
        // Access the user property with correct typing from CustomAuthRequest
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        return res.status(200).json({
            message: 'Profile fetched successfully',
            user: {
                id: user.id,
                email: user.email || 'No email provided',
                username: user.username || 'Anonymous',
                tier: user.tier || 'Free', // Fallback to 'Free' if no tier provided
            },
        });
    }
    catch (error) {
        next(error); // Pass error to global error handler
        // If needed, return a response here as a fallback for errors
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
