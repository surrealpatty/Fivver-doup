"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const models_1 = require("../models");
const createOrder = async (req, res) => {
    try {
        const { userId, serviceId, orderDetails } = req.body;
        const user = await models_1.User.findByPk(userId);
        const service = await models_1.Service.findByPk(serviceId);
        if (!user || !service) {
            return res.status(404).json({ message: 'User or Service not found' });
        }
        const order = await models_1.Order.create({
            userId,
            serviceId,
            orderDetails,
            status: 'Pending',
        });
        res.status(201).json({ message: 'Order created successfully', order });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};
exports.createOrder = createOrder;
const getAllOrders = async (req, res) => {
    try {
        const orders = await models_1.Order.findAll();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};
exports.getAllOrders = getAllOrders;
const getOrderById = async (req, res) => {
    try {
        const order = await models_1.Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
};
exports.getOrderById = getOrderById;
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderDetails, status } = req.body;
        const order = await models_1.Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.orderDetails = orderDetails;
        order.status = status;
        await order.save();
        res.status(200).json({ message: 'Order updated successfully', order });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await models_1.Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.destroy();
        res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=index.js.map