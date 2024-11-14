"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const models_1 = require("../models");
// Create an Order
const createOrder = async (req, res) => {
    const { userId, serviceId, orderDetails } = req.body;
    try {
        // Fetch the User and Service from the database
        const user = await models_1.User.findByPk(userId);
        const service = await models_1.Service.findByPk(serviceId);
        if (!user || !service) {
            return res.status(404).json({ message: 'User or Service not found' });
        }
        // Create the order
        const order = await models_1.Order.create({
            userId,
            serviceId,
            orderDetails,
            status: 'Pending', // Default status
        });
        return res.status(201).json({
            message: 'Order created successfully',
            order,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};
exports.createOrder = createOrder;
// Get All Orders
const getAllOrders = async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await models_1.Order.findAll();
        return res.status(200).json(orders);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};
exports.getAllOrders = getAllOrders;
// Get Order by ID
const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the order by ID
        const order = await models_1.Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json(order);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
};
exports.getOrderById = getOrderById;
// Update Order
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { orderDetails, status } = req.body;
    try {
        // Find the order by ID
        const order = await models_1.Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Update the order with the new details
        order.orderDetails = orderDetails || order.orderDetails;
        order.status = status || order.status;
        // Save the updated order
        await order.save();
        return res.status(200).json({
            message: 'Order updated successfully',
            order,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};
exports.updateOrder = updateOrder;
// Delete Order
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the order by ID
        const order = await models_1.Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Destroy the order
        await order.destroy();
        return res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=orderController.js.map