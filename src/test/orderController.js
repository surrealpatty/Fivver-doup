import { Order, User, Service } from '../models'; // Make sure models are correctly imported
// Create Order
export const createOrder = async (req, res) => {
    try {
        const { userId, serviceId, orderDetails } = req.body;
        // Find user and service by ID
        const user = await User.findByPk(userId);
        const service = await Service.findByPk(serviceId);
        if (!user || !service) {
            return res.status(404).json({ message: 'User or Service not found' });
        }
        // Create order
        const order = await Order.create({
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
// Get All Orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        return res.status(200).json(orders);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
// Get Order by ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
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
// Update Order
export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderDetails, status } = req.body;
        const order = await Order.findByPk(id);
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
// Delete Order
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
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
