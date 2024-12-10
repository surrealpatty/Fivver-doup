"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.ts
const express_1 = require("express");
const user_1 = require("@models/user"); // Correct import for User model
const router = (0, express_1.Router)();
router.post('/register', async (req, res) => {
    const { email, username, password, role = 'free', tier = 'free' } = req.body; // Default role and tier
    try {
        // Hash password before saving user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await user_1.User.create({
            email,
            username,
            password: hashedPassword,
            role,
            tier,
        });
        res.status(201).json({ message: 'User created successfully', user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});
exports.default = router;
