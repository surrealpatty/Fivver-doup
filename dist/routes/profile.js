"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = require("../middlewares/authenticateToken"); // Correct import
const services_1 = __importDefault(require("../models/services"));
const user_1 = require("@models/user");
const router = express_1.default.Router();
router.get('/profile', authenticateToken_1.authenticateToken, async (req, res, next) => {
    const userId = req.user?.id; // Get user ID from the authenticated token
    if (!userId) {
        return res.status(400).json({ message: 'User ID not found in token' });
    }
    try {
        // Fetch the user information and their services
        const user = await user_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const services = await services_1.default.findAll({ where: { userId } });
        return res.status(200).json({
            message: 'User profile retrieved successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                tier: req.user?.tier, // Make sure to return 'tier' as well
            },
            services,
        });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
// Profile update route to allow users to update their profile information
router.put('/profile', authenticateToken_1.authenticateToken, async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(400).json({ message: 'User ID not found in token' });
    }
    const { username, email } = req.body;
    try {
        const user = await user_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        await user.save();
        return res.status(200).json({
            message: 'User profile updated successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                tier: req.user?.tier, // Include the updated 'tier' information
            },
        });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map