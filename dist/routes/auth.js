"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.ts
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Correct import for bcrypt
const user_1 = require("@models/user"); // Correct import for User model
const router = (0, express_1.Router)();
// Register route
router.post('/register', async (req, res) => {
    const { email, username, password, role = 'free', tier = 'free' } = req.body; // Default role and tier
    try {
        // Hash password before saving user
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Ensure to include the 'isVerified' property if required by the model
        const user = await user_1.User.create({
            email,
            username,
            password: hashedPassword,
            role,
            tier,
            isVerified: false, // Adding the 'isVerified' field as required by the User model
        });
        res.status(201).json({ message: 'User created successfully', user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});
exports.default = router;
