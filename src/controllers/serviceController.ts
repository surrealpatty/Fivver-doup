import { Request, Response } from 'express';
import { Service, ServiceAttributes } from '../models/services';


// Controller to get a service by ID
export const getServiceById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { serviceId } = req.params;

    if (!serviceId) {
      return res.status(400).json({ message: 'Service ID is required' });
    }

    // Fetch service by ID
    const service = await Service.findByPk(serviceId);

    // Check if service exists
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Return the found service data
    return res.status(200).json(service);

  } catch (error) {
    // Log and return a server error if something goes wrong
    console.error('Error fetching service:', error);
    return res.status(500).json({ message: 'Internal server error while fetching service.' });
  }
};

// Controller for updating a service
export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { serviceId } = req.params;
    const userId = req.user?.id;

    if (!serviceId) {
      res.status(400).json({ message: 'Service ID is required' });
      return;
    }

    // Fetch the service by ID
    const service = await Service.findByPk(serviceId);

    // Check if service exists
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    // Ensure that the user updating the service is the owner
    if (String(service.userId) !== String(userId)) {
      res.status(403).json({ message: 'You can only update your own services' });
      return;
    }

    // Prepare updated data with explicit type
    const updatedData: Partial<ServiceAttributes & { image?: string }> = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    };

    // Add the image if provided
    if (req.file) {
      updatedData.image = req.file.path;
    }

    // Update the service with the new data
    const updatedService = await service.update(updatedData);

    // Return the updated service
    res.status(200).json({
      message: 'Service updated successfully',
      service: updatedService,
    });

  } catch (err) {
    // Log and return a server error if something goes wrong
    console.error('Error updating service:', err);
    res.status(500).json({ message: 'Error updating service' });
  }
};
