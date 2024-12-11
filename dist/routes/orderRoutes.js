"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = require("../middlewares/authenticateToken"); // Correct import for authenticateToken
const types_1 = require("../types"); // Correct import for AuthRequest and isUser type guard
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
// Route to create an order
router.post('/', authenticateToken_1.authenticateToken, // Middleware to authenticate user
async (req, res, next) => {
    // Ensure that req.user is defined and is of the correct type using isUser guard
    if (!req.user || !(0, types_1.isUser)(req.user)) {
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    try {
        // Now TypeScript knows req.user is defined as UserPayload
        const { tier } = req.user; // Safe to access since isUser ensures user is defined
        if (!tier) {
            // Handle case where the user doesn't have a tier
            return res.status(400).json({ error: 'User does not have a valid tier' });
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