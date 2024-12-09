import { Request, Response, NextFunction } from 'express';
import Service from '@models/services';  // Assuming your Service model is here

export const updateService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;  // Get the service ID from the route parameter
  const { title, description, price } = req.body;  // Get new data from the request body

  try {
    // Ensure req.user is defined before accessing req.user.id
    if (!req.user || typeof req.user.id !== 'number') {
      res.status(401).json({ message: 'User not authenticated' }); // No need to return here
      return;  // Just end the function, don't return the Response object
    }

    // Find the service by ID
    const service = await Service.findByPk(id);

    if (!service) {
      res.status(404).json({ message: 'Service not found' }); // No need to return here
      return;  // Just end the function, don't return the Response object
    }

    // Ensure that req.user.id is of the same type as service.userId
    if (service.userId !== req.user.id) {
      res.status(403).json({ message: 'You are not authorized to edit this service' }); // No need to return here
      return;  // Just end the function, don't return the Response object
    }

    // Update the service with new values
    service.title = title || service.title;
    service.description = description || service.description;
    service.price = price || service.price;

    // Save the updated service
    await service.save();

    // Send the response with the updated service
    res.status(200).json({ message: 'Service updated successfully', service });

  } catch (error) {
    console.error('Error updating service:', error);
    next(error);  // Pass error to the global error handler
  }
};
