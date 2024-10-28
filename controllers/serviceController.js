const Service = require('../models/service');

// 1. Create a Service
exports.createService = async (req, res) => {
    try {
        const { title, description, price, category } = req.body;
        const userId = req.user.id; // Assume `authMiddleware` attaches user ID to req

        // Create a new service in the database
        const newService = await Service.create({
            title,
            description,
            price,
            category,
            userId,
        });

        res.status(201).json(newService); // Respond with the created service
    } catch (error) {
        console.error('Error creating service:', error); // Log error for debugging
        res.status(500).json({ message: 'Error creating service', error: error.message });
    }
};

// 2. Read Services (fetch all or by user)
exports.getServices = async (req, res) => {
    try {
        const userId = req.query.userId; // Get userId from query parameters
        const services = userId
            ? await Service.findAll({ where: { userId } }) // Fetch services for a specific user
            : await Service.findAll(); // Fetch all services

        res.status(200).json(services); // Respond with the fetched services
    } catch (error) {
        console.error('Error fetching services:', error); // Log error for debugging
        res.status(500).json({ message: 'Error fetching services', error: error.message });
    }
};

// 3. Update a Service
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params; // Get service ID from request parameters
        const { title, description, price, category } = req.body;

        // Find the service that belongs to the user
        const service = await Service.findOne({ where: { id, userId: req.user.id } });
        if (!service) return res.status(404).json({ message: 'Service not found' }); // Handle not found

        // Update the service with the new data
        await service.update({ title, description, price, category });

        res.status(200).json(service); // Respond with the updated service
    } catch (error) {
        console.error('Error updating service:', error); // Log error for debugging
        res.status(500).json({ message: 'Error updating service', error: error.message });
    }
};

// 4. Delete a Service
exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params; // Get service ID from request parameters

        // Find the service that belongs to the user
        const service = await Service.findOne({ where: { id, userId: req.user.id } });
        if (!service) return res.status(404).json({ message: 'Service not found' }); // Handle not found

        await service.destroy(); // Delete the service
        res.status(200).json({ message: 'Service deleted successfully' }); // Respond with success message
    } catch (error) {
        console.error('Error deleting service:', error); // Log error for debugging
        res.status(500).json({ message: 'Error deleting service', error: error.message });
    }
};
