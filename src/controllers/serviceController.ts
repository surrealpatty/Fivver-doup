import { Request, Response } from 'express'; // Import types for Express
import Service from '../models/services'; // Ensure the correct path to the Service model

// User payload structure from authentication middleware (assuming it is set somewhere)
interface UserPayload {
  id: string;
}

interface ServiceRequest extends Request {
  user?: UserPayload; // Ensure req.user is correctly typed
}

// 1. Create a Service
export const createService = async (req: ServiceRequest, res: Response) => {
  const { title, description, price, category } = req.body;
  const userId = req.user?.id; // Extract user ID from the request's user object

  // Validation check for userId
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  // Validate required fields
  if (!title || !description || !price || !category) {
    return res.status(400).json({ message: 'All fields (title, description, price, category) are required' });
  }

  try {
    // Create new service using Sequelize
    const newService = await Service.create({
      title,
      description,
      price,
      category, // Ensure category is part of the model
      userId,
    });

    return res.status(201).json(newService); // Return the newly created service
  } catch (error) {
    console.error('Error creating service:', error);
    return res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

// 2. Read Services (fetch all or by user)
export const getServices = async (req: Request, res: Response) => {
  let { userId } = req.query; // Extract userId from query parameters

  // Ensure userId is properly typed
  if (userId && Array.isArray(userId)) {
    userId = userId[0]; // If userId is an array, get the first value
  }

  try {
    // Fetch services based on userId if provided, otherwise fetch all services
    const services = userId
      ? await Service.findAll({ where: { userId: userId as string } }) // Ensure userId is cast to string
      : await Service.findAll();

    return res.status(200).json(services); // Return the list of services
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// 3. Update a Service
export const updateService = async (req: ServiceRequest, res: Response) => {
  const { id } = req.params; // Service ID from URL parameters
  const { title, description, price, category } = req.body; // Updated fields

  try {
    // Find the service to update, making sure it's associated with the current user
    const service = await Service.findOne({ where: { id, userId: req.user?.id } });

    if (!service) {
      return res.status(404).json({ message: 'Service not found or unauthorized access' });
    }

    // Update the service with new data
    await service.update({ title, description, price, category });

    return res.status(200).json(service); // Return the updated service
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

// 4. Delete a Service
export const deleteService = async (req: ServiceRequest, res: Response) => {
  const { id } = req.params; // Service ID from URL parameters

  try {
    // Find the service to delete, making sure it's associated with the current user
    const service = await Service.findOne({ where: { id, userId: req.user?.id } });

    if (!service) {
      return res.status(404).json({ message: 'Service not found or unauthorized access' });
    }

    // Delete the service from the database
    await service.destroy();

    return res.status(200).json({ message: 'Service deleted successfully' }); // Return success message
  } catch (error) {
    console.error('Error deleting service:', error);
    return res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};
