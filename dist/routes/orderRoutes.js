"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/orderRoutes.ts
const express_1 = require("express");
const types_1 = require("../types"); // Correct import for AuthRequest and isUser type guard
const authenticateToken_1 = require("../middlewares/authenticateToken"); // Correct import for authenticateToken middleware
const orderController_1 = require("../controllers/orderController"); // Assuming createOrder function exists in your controllers
const router = (0, express_1.Router)();
// Route to create an order
router.post('/order', // Correct route to create order
authenticateToken_1.authenticateToken, // Middleware to authenticate user
async (req, res, next) => {
    // Check if req.user is defined and is a valid user using the isUser guard
    if (!req.user || !(0, types_1.isUser)(req.user)) {
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    try {
        // Safe to access req.user since isUser ensures it's valid
        const { tier } = req.user;
        if (!tier) {
            // Handle case where the user doesn't have a valid tier
            return res.status(400).json({ error: 'User does not have a valid tier' });
        }
        // Proceed with order creation logic using createOrder from controller
        await (0, orderController_1.createOrder)(req, res);
        // If order creation is successful, send a success response
        return res.status(201).json({ message: 'Order created successfully' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map