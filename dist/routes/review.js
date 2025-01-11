"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
const router = express_1.default.Router();
// GET /review - Example route to fetch a review
router.get('/review', authenticateToken_1.authenticateToken, // Middleware to authenticate user
async (req, res, next) => {
    try {
        const user = req.user; // Get the user from the request
        // If user is not authenticated, respond with a 401 error
        if (!user) {
            res.status(401).json({ message: 'User not authenticated' });
            return; // Return early to ensure no further code executes
        }
        // Respond with sample review data (replace with actual logic as needed)
        res.status(200).json({
            message: 'Review fetched successfully',
            review: {
                userId: user.id,
                content: 'This is a sample review.',
            },
        });
    }
    catch (error) {
        next(error); // Pass error to the global error handler
    }
});
exports.default = router;
