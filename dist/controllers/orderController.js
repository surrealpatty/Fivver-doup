"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const order_1 = require("../models/order"); // Correct path for the Order model
const database_1 = require("../config/database"); // Correct path for the sequelize instance
// Create order controller
const createOrder = async (req, res) => {
    try {
        const { userId, serviceId, orderDetails, status } = req.body;
        // Use type assertion to match the expected input for Order.create
        const order = await order_1.Order.create({
            userId,
            serviceId,
            orderDetails,
            status,
        }); // Type assertion as `any`
        return res.status(201).json(order);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating order', error });
    }
};
exports.createOrder = createOrder;
// Get all orders controller
const getAllOrders = async (req, res) => {
    try {
        const orders = await order_1.Order.findAll();
        return res.status(200).json(orders);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching orders', error });
    }
};
exports.getAllOrders = getAllOrders;
// Get order by ID controller
const getOrderById = async (req, res) => {
    try {
        const order = await order_1.Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json(order);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching order', error });
    }
};
exports.getOrderById = getOrderById;
// Update order controller
const updateOrder = async (req, res) => {
    try {
        const order = await order_1.Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const { status } = req.body;
        order.status = status;
        await order.save();
        return res.status(200).json(order);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating order', error });
    }
};
exports.updateOrder = updateOrder;
// Delete order controller
const deleteOrder = async (req, res) => {
    try {
        const order = await order_1.Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.destroy();
        return res.status(204).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting order', error });
    }
};
exports.deleteOrder = deleteOrder;
// Function to test the database connection
const testConnection = async () => {
    try {
        await database_1.sequelize.authenticate(); // Test the connection
        console.log('Database connection successful');
        return true; // Return true if connection is successful
    }
    catch (error) {
        // Type assertion to ensure 'error' is of type 'Error'
        if (error instanceof Error) {
            console.error('Unable to connect to the database:', error.message);
        }
        else {
            console.error('Unable to connect to the database: Unknown error');
        }
        return false; // Return false if there is an error
    }
};
exports.testConnection = testConnection;
//# sourceMappingURL=orderController.js.map