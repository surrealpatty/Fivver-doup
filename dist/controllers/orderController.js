"use strict";
const Order = require('../models/order'); // Adjust path as necessary
const Service = require('../models/services'); // Adjust path as necessary
const User = require('../models/user'); // Adjust path as necessary
// 1. Create an Order
exports.createOrder = async (req, res) => {
    const { serviceId } = req.body;
    const userId = req.user.id; // Assume `authMiddleware` attaches user ID to req
    try {
        // Check if the service exists
        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        // Create a new order
        const newOrder = await Order.create({ serviceId, userId });
        return res.status(201).json(newOrder); // Respond with the created order
    }
    catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};
// 2. Read Orders (fetch all or by user)
exports.getOrders = async (req, res) => {
    const userId = req.query.userId; // Get userId from query parameters
    try {
        const orders = userId
            ? await Order.findAll({ where: { userId } }) // Fetch orders for a specific user
            : await Order.findAll(); // Fetch all orders
        return res.status(200).json(orders); // Respond with the fetched orders
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};
// 3. Update an Order
exports.updateOrder = async (req, res) => {
    const { id } = req.params; // Get order ID from request parameters
    try {
        const order = await Order.findByPk(id); // Find the order by ID
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Update the order with new data (if necessary)
        await order.update(req.body); // Assuming req.body contains the fields to be updated
        return res.status(200).json(order); // Respond with the updated order
    }
    catch (error) {
        console.error('Error updating order:', error);
        return res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};
// 4. Delete an Order
exports.deleteOrder = async (req, res) => {
    const { id } = req.params; // Get order ID from request parameters
    try {
        const order = await Order.findByPk(id); // Find the order by ID
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.destroy(); // Delete the order
        return res.status(200).json({ message: 'Order deleted successfully' }); // Respond with success message
    }
    catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};
