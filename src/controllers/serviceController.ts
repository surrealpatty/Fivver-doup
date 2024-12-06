import { Request, Response } from 'express';
import  Service  from '../models/services'; // Named import of the Service model
import { User } from '../models/user'; // Named import of the User model

// Controller function to handle POST /services (Create Service)
export const createService = async (req: Request, res: Response): Promise<Response> => {
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
        const newService = await Service.create({
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
    } catch (error) {
        console.error(error);
        // Narrow the error type to `Error` and handle it
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error creating service', error: error.message });
        }
        // If it's not an instance of `Error`, send a generic error response
        return res.status(500).json({ message: 'Error creating service', error: 'Unknown error' });
    }
};

// Controller function to handle PUT /services/:serviceId (Update Service)
export const updateService = async (req: Request, res: Response): Promise<Response> => {
    const { serviceId } = req.params;  // Get the service ID from the route parameters
    const { title, description, price } = req.body; // Get the updated data from the request body

    try {
        // Validate request body
        if (!title || !description || price === undefined) {
            return res.status(400).json({ message: 'All fields (title, description, price) are required.' });
        }

        // Find the service by its ID using Sequelize
        const service = await Service.findByPk(serviceId);

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
    } catch (error) {
        console.error(error);
        // Narrow the error type to `Error` and handle it
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error updating service', error: error.message });
        }
        // If it's not an instance of `Error`, send a generic error response
        return res.status(500).json({ message: 'Error updating service', error: 'Unknown error' });
    }
};
