import { Request, Response } from 'express'; // Import types for Express
import Service from '../models/services'; // Ensure correct model path (remove `.js` for TypeScript)

interface UserPayload {
  id: string;
}

interface ServiceRequest extends Request {
  user?: UserPayload; // Ensure req.user is correctly typed as having an id
}

// 1. Create a Service
export const createService = async (req: ServiceRequest, res: Response) => {
  const { title, description, price, category } = req.body;
  const userId = req.user?.id; // Ensure req.user exists

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const newService = await Service.create({
      title,
      description,
      price,
      category,
      userId,
    });

    return res.status(201).json(newService);
  } catch (error) {
    console.error('Error creating service:', error);
    return res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

// 2. Read Services (fetch all or by user)
export const getServices = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const services = userId
      ? await Service.findAll({ where: { userId } })
      : await Service.findAll();

    return res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// 3. Update a Service
export const updateService = async (req: ServiceRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, price, category } = req.body;

  try {
    const service = await Service.findOne({ where: { id, userId: req.user?.id } });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.update({ title, description, price, category });

    return res.status(200).json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

// 4. Delete a Service
export const deleteService = async (req: ServiceRequest, res: Response) => {
  const { id } = req.params;

  try {
    const service = await Service.findOne({ where: { id, userId: req.user?.id } });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.destroy();
    return res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};
