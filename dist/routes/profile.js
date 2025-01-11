"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
const router = express_1.default.Router();
// GET /profile - Fetch profile information
router.get('/profile', authenticateToken_1.authenticateToken, // Middleware to authenticate user
async (req, res, next) => {
    try {
        const user = req.user;
        // If user is not authenticated, respond with a 401 error
        if (!user) {
            res.status(401).json({ message: 'User not authenticated' });
            return; // Return early to ensure no further code executes
        }
        // Respond with profile details
        res.status(200).json({
            message: 'Profile fetched successfully',
            user: {
                id: user.id,
                email: user.email || 'No email provided',
                username: user.username || 'Anonymous',
                tier: user.tier, // Assume `tier` is always defined; no fallback needed
            },
        });
    }
    catch (error) {
        next(error); // Pass error to the global error handler
    }
});
exports.default = router;
