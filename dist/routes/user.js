"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user"); // Ensure correct import path based on your tsconfig
const userRouter = (0, express_1.Router)(); // Initialize express router
exports.userRouter = userRouter;
// User Login Route
userRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body; // Destructure email and password from the request body
    try {
        // Find the user in the database using Sequelize model
        const user = await user_1.User.findOne({ where: { email } });
        // If user not found
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Compare the provided password with the stored hash
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token on successful login
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'your_secret', {
            expiresIn: '1h',
        });
        // Send the token in response
        return res.json({ token });
    }
    catch (error) {
        console.error(error);
        next(error); // Pass error to error handling middleware
    }
});
