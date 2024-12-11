"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
// Correct route handler signature
userRouter.get('/', (req, res, next) => {
    try {
        // Add your route logic here
        res.status(200).json({ message: 'User routes are working!' });
    }
    catch (error) {
        // Handle any errors by passing them to the next middleware
        next(error);
    }
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map