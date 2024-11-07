// serviceController.js
const { Service } = require('../models'); // Ensure correct model path

// 1. Create a Service
exports.createService = async (req, res) => {
    const { title, description, price, category } = req.body;
    const userId = req.user.id; // Assume `authMiddleware` attaches user ID to req

    // Validate the input
    if (!title || !description || !price || !category) {
        return res.status(400).json({ message: 'All fields (title, description, price, category) are required' });
    }

    try {
        // Create a new service in the database
        const newService = await Service.create({
            title,
            description,
            price,
            category,
            userId,
        });

        return res.status(201).json({ message: 'Service created successfully', service: newService });
    } catch (error) {
        console.error('Error creating service:', error); // Log error for debugging
        return res.status(500).json({ message: 'Error creating service', error: error.message });
    }
};

// 2. Read Services (fetch all or by user)
exports.getServices = async (req, res) => {
    const userId = req.query.userId; // Get userId from query parameters

    try {
        const services = userId
            ? await Service.findAll({ where: { userId } }) // Fetch services for a specific user
            : await Service.findAll(); // Fetch all services

        if (services.length === 0) {
            return res.status(404).json({ message: 'No services found' }); // If no services found
        }

        return res.status(200).json(services); // Respond with the fetched services
    } catch (error) {
        console.error('Error fetching services:', error); // Log error for debugging
        return res.status(500).json({ message: 'Error fetching services', error: error.message });
    }
};

// 3. Update a Service
exports.updateService = async (req, res) => {
    const { id } = req.params; // Get service ID from request parameters
    const { title, description, price, category } = req.body;

    // Validate the input
    if (!title && !description && !price && !category) {
        return res.status(400).json({ message: 'At least one field (title, description, price, category) is required to update' });
    }

    try {
        // Find the service that belongs to the user
        const service = await Service.findOne({ where: { id, userId: req.user.id } });

        if (!service) {
            return res.status(404).json({ message: 'Service not found' }); // Handle not found
        }

        // Update the service with the new data
        if (title) service.title = title;
        if (description) service.description = description;
        if (price) service.price = price;
        if (category) service.category = category;

        await service.save(); // Save the updated service

        return res.status(200).json({ message: 'Service updated successfully', service });
    } catch (error) {
        console.error('Error updating service:', error); // Log error for debugging
        return res.status(500).json({ message: 'Error updating service', error: error.message });
    }
};

// 4. Delete a Service
exports.deleteService = async (req, res) => {
    const { id } = req.params; // Get service ID from request parameters

    try {
        // Find the service that belongs to the user
        const service = await Service.findOne({ where: { id, userId: req.user.id } });

        if (!service) {
            return res.status(404).json({ message: 'Service not found' }); // Handle not found
        }

        await service.destroy(); // Delete the service
        return res.status(200).json({ message: 'Service deleted successfully' }); // Respond with success message
    } catch (error) {
        console.error('Error deleting service:', error); // Log error for debugging
        return res.status(500).json({ message: 'Error deleting service', error: error.message });
    }
};
