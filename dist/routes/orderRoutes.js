"use strict";
// src/routes/orderRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
// Define the handler types
const createOrderHandler = async (req, res) => {
    try {
        // Ensure that the user is available and has the necessary 'tier' property
        if (!req.user || !req.user.tier) {
            return res.status(401).json({ error: 'User is not authenticated or missing tier information' });
        }
        // Call createOrder controller with the request and response
        await (0, orderController_1.createOrder)(req, res);
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
// Route to create an order
router.post('/', createOrderHandler);
// Other routes can follow the same pattern...
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map