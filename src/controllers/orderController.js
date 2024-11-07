const Order = require('../models/order'); // Ensure the correct path
const User = require('../models/user');
const Service = require('../models/service');

// 1. Create an Order
exports.createOrder = async (req, res) => {
    const { userId, serviceId, orderDetails } = req.body;

    // Input validation (ensuring necessary fields are provided)
    if (!userId || !serviceId || !orderDetails) {
        return res.status(400).json({ error: 'User ID, Service ID, and order details are required.' });
    }

    try {
        // Validate if user and service exist
        const user = await User.findByPk(userId);
        const service = await Service.findByPk(serviceId);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (!service) {
            return res.status(404).json({ error: 'Service not found.' });
        }

        // Create the new order
        const newOrder = await Order.create({
            userId,
            serviceId,
            orderDetails,
            status: 'Pending', // Default status
        });

        return res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// 2. Get all Orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [User, Service], // Optionally include user and service details
        });
        return res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// 3. Get Order by ID
exports.getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id, {
            include: [User, Service], // Optionally include user and service details
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        return res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
};

// 4. Update an Order
exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const { orderDetails, status } = req.body;

    // Validate required fields
    if (!orderDetails && !status) {
        return res.status(400).json({ error: 'Order details or status are required to update.' });
    }

    try {
        const order = await Order.findByPk(id);

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
    } catch (error) {
        console.error('Error updating order:', error);
        return res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};

// 5. Delete an Order
exports.deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.destroy();
        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};
