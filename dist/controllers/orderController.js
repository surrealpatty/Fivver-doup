"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const order_1 = __importDefault(require("../models/order")); // Ensure the correct path to order model
const user_1 = __importDefault(require("../models/user"));
const service_1 = __importDefault(require("../models/service"));
// 1. Create an Order
const createOrder = async (req, res) => {
    const { userId, serviceId, orderDetails } = req.body;
    // Input validation (ensuring necessary fields are provided)
    if (!userId || !serviceId || !orderDetails) {
        return res.status(400).json({ error: 'User ID, Service ID, and order details are required.' });
    }
    try {
        // Validate if user and service exist
        const user = await user_1.default.findByPk(userId);
        const service = await service_1.default.findByPk(serviceId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        if (!service) {
            return res.status(404).json({ error: 'Service not found.' });
        }
        // Create the new order
        const newOrder = await order_1.default.create({
            userId,
            serviceId,
            orderDetails,
            status: 'Pending', // Default status
        });
        return res.status(201).json({ message: 'Order created successfully', order: newOrder });
    }
    catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};
exports.createOrder = createOrder;
// 2. Get all Orders
const getOrders = async (req, res) => {
    try {
        const orders = await order_1.default.findAll({
            include: [user_1.default, service_1.default], // Optionally include user and service details
        });
        return res.status(200).json(orders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};
exports.getOrders = getOrders;
// 3. Get Order by ID
const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await order_1.default.findByPk(id, {
            include: [user_1.default, service_1.default], // Optionally include user and service details
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json(order);
    }
    catch (error) {
        console.error('Error fetching order:', error);
        return res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
};
exports.getOrderById = getOrderById;
// 4. Update an Order
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { orderDetails, status } = req.body;
    // Validate required fields
    if (!orderDetails && !status) {
        return res.status(400).json({ error: 'Order details or status are required to update.' });
    }
    try {
        const order = await order_1.default.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Update the order with the provided details
        if (orderDetails) {
            order.orderDetails = orderDetails;
        }
        if (status) {
            order.status = status;
        }
        await order.save();
        return res.status(200).json({ message: 'Order updated successfully', order });
    }
    catch (error) {
        console.error('Error updating order:', error);
        return res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};
exports.updateOrder = updateOrder;
// 5. Delete an Order
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await order_1.default.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.destroy();
        return res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=orderController.js.map