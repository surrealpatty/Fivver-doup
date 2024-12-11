"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken")); // Correctly typed authenticateToken
const types_1 = require("../types"); // Correct import for isUser type guard
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
// Route to create an order
router.post('/', authenticateToken_1.default, async (req, res, next) => {
    // Use the isUser guard to check if the user is authenticated
    if (!(0, types_1.isUser)(req)) {
        return res.status(401).json({ error: 'User is not authenticated or missing tier information' });
    }
    try {
        // Now TypeScript knows req.user is defined
        const { tier } = req.user; // Safe to access since isUser ensures user is defined
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
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map