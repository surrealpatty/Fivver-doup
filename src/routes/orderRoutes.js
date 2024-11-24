"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
/**
 * Route to create an order.
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, orderController_1.createOrder)(req, res);
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}));
/**
 * Route to get all orders.
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, orderController_1.getAllOrders)(req, res);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}));
/**
 * Route to get an order by its ID.
 */
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
        res.status(400).json({ message: 'Invalid order ID' });
        return;
    }
    try {
        yield (0, orderController_1.getOrderById)(req, res);
    }
    catch (error) {
        console.error(`Error fetching order with ID ${id}:`, error);
        res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}));
/**
 * Route to update an order by its ID.
 */
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
        res.status(400).json({ message: 'Invalid order ID' });
        return;
    }
    try {
        yield (0, orderController_1.updateOrder)(req, res);
    }
    catch (error) {
        console.error(`Error updating order with ID ${id}:`, error);
        res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}));
/**
 * Route to delete an order by its ID.
 */
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
        res.status(400).json({ message: 'Invalid order ID' });
        return;
    }
    try {
        yield (0, orderController_1.deleteOrder)(req, res);
    }
    catch (error) {
        console.error(`Error deleting order with ID ${id}:`, error);
        res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}));
exports.default = router;
