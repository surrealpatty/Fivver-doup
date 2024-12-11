"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
// Define the /register POST route
userRouter.post('/register', async (req, res, next) => {
    try {
        // Call the registerUser controller to handle the registration logic
        await (0, userController_1.registerUser)(req, res);
    }
    catch (error) {
        // If an error occurs, pass it to the next middleware
        next(error);
    }
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map