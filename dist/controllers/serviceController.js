"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateService = exports.createService = void 0;
const services_1 = __importDefault(require("../models/services")); // Named import of the Service model
// Controller function to handle POST /services (Create Service)
const createService = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        // Validate request body
        if (!title || !description || price === undefined) {
            return res.status(400).json({ message: 'All fields (title, description, price) are required.' });
        }
        // Retrieve the user ID from the authenticated token (assumed to be in req.user)
        const userId = parseInt(req.user?.id || '', 10);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }
        // Create the new service using Sequelize ORM
        const newService = await services_1.default.create({
            title,
            description,
            price,
            userId
        });
        // Respond with the created service
        return res.status(201).json({
            message: 'Service created successfully.',
            service: newService
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating service', error });
    }
};
exports.createService = createService;
// Controller function to handle PUT /services/:serviceId (Update Service)
const updateService = async (req, res) => {
    const { serviceId } = req.params; // Get the service ID from the route parameters
    const { title, description, price } = req.body; // Get the updated data from the request body
    try {
        // Validate request body
        if (!title || !description || price === undefined) {
            return res.status(400).json({ message: 'All fields (title, description, price) are required.' });
        }
        // Find the service by its ID using Sequelize
        const service = await services_1.default.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found.' });
        }
        // Check if the user is the owner of the service (optional but recommended)
        if (service.userId !== parseInt(req.user?.id || '', 10)) {
            return res.status(403).json({ message: 'You are not authorized to update this service.' });
        }
        // Update the service with new values
        await service.update({ title, description, price });
        return res.status(200).json({ message: 'Service updated successfully.', service });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating service', error: error.message });
    }
};
exports.updateService = updateService;
//# sourceMappingURL=serviceController.js.map