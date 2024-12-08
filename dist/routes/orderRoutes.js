"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController"); // Ensure the correct path to controller
const router = express_1.default.Router();
// Route to create an order
router.post('/', async (req, res) => {
    try {
        await (0, orderController_1.createOrder)(req, res);
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Route to get all orders
router.get('/', async (req, res) => {
    try {
        await (0, orderController_1.getAllOrders)(req, res);
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Route to get an order by its ID
router.get('/:id', async (req, res) => {
    try {
        await (0, orderController_1.getOrderById)(req, res);
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Route to update an order by its ID
router.put('/:id', async (req, res) => {
    try {
        await (0, orderController_1.updateOrder)(req, res);
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Route to delete an order by its ID
router.delete('/:id', async (req, res) => {
    try {
        await (0, orderController_1.deleteOrder)(req, res);
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
