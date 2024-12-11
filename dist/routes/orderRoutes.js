"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/orderRoutes.ts
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
const types_1 = require("../types"); // Assuming isUserPayload is correctly imported
const orderController_1 = require("../controllers/orderController"); // Ensure createOrder is correctly imported
const router = express_1.default.Router();
// Define the handler for creating an order
const createOrderHandler = async (req, res, next) => {
    if ((0, types_1.isUserPayload)(req.user)) { // Use the type guard to ensure user is valid
        try {
            // Proceed with order creation logic, passing the correct request body
            const orderData = {
                userId: req.user.id, // Assuming req.user contains `id` and `tier`
                serviceId: req.body.serviceId,
                orderDetails: req.body.orderDetails,
                status: 'pending', // Set default status or customize as needed
            };
            await (0, orderController_1.createOrder)(orderData, res); // Pass orderData to createOrder
        }
        catch (err) {
            next(err); // Pass errors to the next middleware
        }
    }
    else {
        res.status(400).json({ message: 'Invalid user data or missing tier information' });
    }
};
// Route to create an order
router.post('/', authenticateToken_1.authenticateToken, createOrderHandler);
// Example for a getAllOrders route:
router.get('/', authenticateToken_1.authenticateToken, async (req, res) => {
    if ((0, types_1.isUserPayload)(req.user)) { // Ensure user is valid before proceeding
        try {
            // Your logic to fetch all orders
            res.status(200).json({ message: 'Fetched orders successfully' });
        }
        catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    else {
        res.status(400).json({ message: 'Invalid user data or missing tier information' });
    }
});
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map