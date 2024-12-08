"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("../models/user"); // Assuming User model is correctly imported
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
// Example login route
userRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Handle password validation, token generation, etc.
        return res.json({ message: 'Login successful' }); // Adjust response based on your logic
    }
    catch (error) {
        console.error(error);
        next(error); // Pass the error to the global error handler
    }
});
