"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("@models/user"); // Adjust the path as necessary
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await user_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        // Add password validation and token logic here
        res.json({ message: 'Login successful' });
    }
    catch (error) {
        next(error); // Pass error to Express's error handler
    }
});
