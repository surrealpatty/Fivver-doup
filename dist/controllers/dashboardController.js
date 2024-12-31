import { Order } from '../models/order'; // Assuming this model exists
import { Service } from '../models/services';
export const getDashboardData = async (req, res) => {
    try {
        // Ensure that req.user is defined before using it
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        const userId = req.user.id; // Extract user ID from the authenticated user
        // Fetch user services and orders (no ratings since there's no ratings model)
        const services = await Service.findAll({ where: { userId } });
        const orders = await Order.findAll({ where: { userId } });
        // Return the fetched data
        res.json({ services, orders });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
};
