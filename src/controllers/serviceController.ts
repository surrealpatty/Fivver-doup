import { Request, Response } from 'express';
import Service from '../models/services'; // Named import of the Service model
import { User } from '../models/user'; // Named import of the User model

// Controller function to handle POST /services
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
        return res.status(500).json({ message: 'Error creating service', error });
    }
};
