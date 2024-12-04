"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Adjust path as needed
const user_1 = require("../models/user"); // Correct
const router = express_1.default.Router();
// Route to fetch the user's profile data
router.get('/', authMiddleware_1.authenticateToken, async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(400).json({ message: 'User ID is missing or invalid' });
        return;
    }
    try {
        const userProfile = await user_1.User.findByPk(userId);
        if (!userProfile) {
            res.status(404).json({ message: 'User profile not found' });
            return;
        }
        res.status(200).json({
            message: 'Profile data fetched successfully',
            profile: {
                id: userProfile.id,
                username: userProfile.username,
                email: userProfile.email,
            },
        });
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map