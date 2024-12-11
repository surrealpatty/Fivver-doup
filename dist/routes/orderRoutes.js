"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/orderRoutes.ts
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware")); // Correct import for authenticateToken middleware
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
// Route to create an order
router.post('/', authMiddleware_1.default, async (req, res, next) => {
    try {
        // Ensure that the user is available and has the necessary 'tier' property
        if (!req.user || !req.user.tier) {
            return res.status(401).json({ error: 'User is not authenticated or missing tier information' });
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