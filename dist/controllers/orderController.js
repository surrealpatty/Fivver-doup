import { Order } from '../models/order'; // Correct path for the Order model
import { sequelize } from '../config/database'; // Correct import
// Create order controller
export const createOrder = async (req, res) => {
    try {
        const { userId, serviceId, orderDetails, status } = req.body;
        // Use type assertion to match the expected input for Order.create
        const order = await Order.create({
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
// Get all orders controller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        return res.status(200).json(orders);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching orders', error });
    }
};
// Get order by ID controller
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json(order);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching order', error });
    }
};
// Update order controller
export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
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
// Delete order controller
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
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
// Function to test the database connection
export const testConnection = async () => {
    try {
        await sequelize.authenticate(); // Test the connection
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
