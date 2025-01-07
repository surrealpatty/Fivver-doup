import { Request, Response } from 'express';
import { Service } from '../models/services'; // Assuming Service is a Sequelize model

export class ServiceController {
  // Create a new service
  static createService = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title, description, price } = req.body;
      const userId = req.user?.id; // Assuming userId is set in the request (e.g., via authentication middleware)

      // Validate the incoming data
      if (!title || !description || !price || !userId) {
        return res.status(400).json({ message: 'All fields (title, description, price) and userId are required.' });
      }

      // Add a role field if it's required in your Service model
      const role = 'user';  // Add a default or dynamically determined role here

      // Create the service in the database
      const service = await Service.create({
        title,
        description,
        price,
        userId, // Include userId as part of the service creation
        role,   // Include role field
      });

      return res.status(201).json({
        message: 'Service created successfully',
        service,
      });
    } catch (error) {
      console.error('Error creating service:', error);
      return res.status(500).json({ message: 'Service creation failed', error });
    }
  };

  // Other methods...
}
