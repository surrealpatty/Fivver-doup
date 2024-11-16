"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const models_1 = require("../models"); // Make sure models are correctly imported
// Create Order
const createOrder = async (req, res) => {
    try {
        const { userId, serviceId, orderDetails } = req.body;
        // Find user and service by ID
        const user = await models_1.User.findByPk(userId);
        const service = await models_1.Service.findByPk(serviceId);
        if (!user || !service) {
            return res.status(404).json({ message: 'User or Service not found' });
        }
        // Create order
        const order = await models_1.Order.create({
            userId,
            serviceId,
            orderDetails,
            status: 'Pending', // Default status
        });
        return res.status(201).json({ message: 'Order created successfully', order });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
exports.createOrder = createOrder;
// Get All Orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await models_1.Order.findAll();
        return res.status(200).json(orders);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
exports.getAllOrders = getAllOrders;
// Get Order by ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await models_1.Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json(order);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
exports.getOrderById = getOrderById;
// Update Order
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderDetails, status } = req.body;
        const order = await models_1.Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Update the order
        order.orderDetails = orderDetails || order.orderDetails;
        order.status = status || order.status;
        await order.save();
        return res.status(200).json({ message: 'Order updated successfully', order });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
exports.updateOrder = updateOrder;
// Delete Order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await models_1.Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Delete the order
        await order.destroy();
        return res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=orderController.js.map