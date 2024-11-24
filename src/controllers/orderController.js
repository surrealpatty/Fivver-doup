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
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const order_1 = __importDefault(require("../models/order")); // Import the initialized Order model
// Basic input validation for creating an order
const validateOrderInput = (userId, serviceId, quantity, totalPrice) => {
    const errors = [];
    if (!userId || isNaN(parseInt(userId)))
        errors.push('Invalid or missing user ID.');
    if (!serviceId || isNaN(parseInt(serviceId)))
        errors.push('Invalid or missing service ID.');
    if (!quantity || isNaN(parseInt(quantity)) || parseInt(quantity) <= 0)
        errors.push('Invalid quantity.');
    if (!totalPrice || isNaN(parseFloat(totalPrice)) || parseFloat(totalPrice) <= 0)
        errors.push('Invalid total price.');
    return {
        isValid: errors.length === 0,
        message: errors.join(' ') || '',
    };
};
/**
 * CREATE: Add a new order
 */
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, serviceId, quantity, totalPrice, orderDetails, status = 'Pending' } = req.body;
    try {
        const validation = validateOrderInput(userId, serviceId, quantity, totalPrice);
        if (!validation.isValid) {
            return res.status(400).json({
                message: validation.message,
                error: 'ValidationError',
            });
        }
        // Prepare data
        const parsedUserId = parseInt(userId, 10);
        const parsedServiceId = parseInt(serviceId, 10);
        const parsedQuantity = parseInt(quantity, 10);
        const parsedTotalPrice = parseFloat(totalPrice);
        const totalAmount = parsedTotalPrice;
        // Validate status
        const validStatuses = ['Pending', 'Completed', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Invalid order status. Allowed values are Pending, Completed, or Cancelled.',
                error: 'InvalidStatusError',
            });
        }
        // Create the new order
        const order = yield order_1.default.create({
            userId: parsedUserId,
            serviceId: parsedServiceId,
            quantity: parsedQuantity,
            totalPrice: parsedTotalPrice,
            totalAmount: totalAmount,
            orderDetails: orderDetails,
            status: status,
        });
        return res.status(201).json({
            message: 'Order created successfully.',
            order,
        });
    }
    catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({
            message: 'Internal server error while creating the order.',
            error: error instanceof Error ? error.message : 'UnknownError',
        });
    }
});
exports.createOrder = createOrder;
/**
 * READ: Get all orders
 */
const getAllOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.findAll();
        return res.status(200).json(orders);
    }
    catch (error) {
        console.error('Error fetching all orders:', error);
        return res.status(500).json({
            message: 'Internal server error while fetching all orders.',
            error: error instanceof Error ? error.message : 'UnknownError',
        });
    }
});
exports.getAllOrders = getAllOrders;
/**
 * READ: Get a specific order by ID
 */
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield order_1.default.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        return res.status(200).json(order);
    }
    catch (error) {
        console.error('Error fetching order by ID:', error);
        return res.status(500).json({
            message: 'Internal server error while fetching the order.',
            error: error instanceof Error ? error.message : 'UnknownError',
        });
    }
});
exports.getOrderById = getOrderById;
/**
 * UPDATE: Update an existing order
 */
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { quantity, totalPrice, orderDetails, status } = req.body;
    try {
        const order = yield order_1.default.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        // Update fields
        if (quantity)
            order.quantity = parseInt(quantity, 10);
        if (totalPrice)
            order.totalPrice = parseFloat(totalPrice);
        if (orderDetails)
            order.orderDetails = orderDetails;
        if (status)
            order.status = status;
        yield order.save();
        return res.status(200).json({
            message: 'Order updated successfully.',
            order,
        });
    }
    catch (error) {
        console.error('Error updating order:', error);
        return res.status(500).json({
            message: 'Internal server error while updating the order.',
            error: error instanceof Error ? error.message : 'UnknownError',
        });
    }
});
exports.updateOrder = updateOrder;
/**
 * DELETE: Delete an order
 */
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield order_1.default.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        yield order.destroy();
        return res.status(200).json({ message: 'Order deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({
            message: 'Internal server error while deleting the order.',
            error: error instanceof Error ? error.message : 'UnknownError',
        });
    }
});
exports.deleteOrder = deleteOrder;
