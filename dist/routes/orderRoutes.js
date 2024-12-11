"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/orderRoutes.ts
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const types_1 = require("../types"); // Import the type guard
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
// Route to create an order
router.post('/', authenticateToken_1.default, async (req, res, next) => {
    if (!(0, types_1.isUser)(req)) {
        // Handle the case where user is not authenticated
        return res.status(401).json({ error: 'User is not authenticated or missing tier information' });
    }
    try {
        // Now that TypeScript knows req.user is defined, you can safely use it
        const { tier } = req.user; // Destructure to get tier, you can check additional properties too
        if (!tier) {
            // Handle case where the user doesn't have a tier
            return res.status(401).json({ error: 'User does not have a valid tier' });
        }
        // Proceed with order creation logic
        await (0, orderController_1.createOrder)(req, res);
        // If order creation is successful, send a success response
        return res.status(201).json({ message: 'Order created successfully' });
    }
    catch (err) {
        // Log the error and send a generic internal server error
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map