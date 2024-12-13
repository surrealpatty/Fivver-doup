"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user"); // Make sure the path to User is correct
const router = (0, express_1.Router)();
// POST /api/users/register - User Registration Route
router.post('/register', async (req, res) => {
    const { email, password, username, tier } = req.body;
    try {
        if (!email || !password || !username) {
            return res.status(400).json({ message: 'Email, password, and username are required' });
        }
        const existingUser = await user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await user_1.User.create({
            email,
            password: hashedPassword,
            username,
            tier: tier || 'free', // Default tier is 'free'
            role: 'user',
            isVerified: false,
        });
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                tier: newUser.tier,
            },
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map