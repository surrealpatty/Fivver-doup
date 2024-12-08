// src/controllers/serviceController.ts
import { Request, Response } from 'express'; // Import the types

export const updateService = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    service.name = name ?? service.name;
    service.description = description ?? service.description;
    service.price = price ?? service.price;

    await service.save();

    res.status(200).json({ message: 'Service updated successfully', service });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error updating service', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};
