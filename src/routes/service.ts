import { Router, Request, Response, NextFunction } from 'express';
import Service from '@models/services';  // Ensure this import is correct
import { body, validationResult } from 'express-validator';
import authenticateToken from '@middlewares/authenticateToken';  // Ensure the token middleware is correct

const router = Router();

// Update service route
router.put(
  '/update/:serviceId',
  authenticateToken,  // Protect route
  [
    body('name').isLength({ min: 3 }).withMessage('Service name is required'),
    body('description').isLength({ min: 5 }).withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a valid number'),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() }); // Just call `res` without returning it
      return; // Don't return `res`, just exit the function here
    }

    const { name, description, price } = req.body;
    const { serviceId } = req.params;
    const userId = req.user?.id; // Extract user id from the token

    try {
      // Find the service by ID and check if it belongs to the user
      const service = await Service.findOne({ where: { id: serviceId } });
      if (!service) {
        res.status(404).json({ message: 'Service not found' }); // Just call `res` without returning it
        return;
      }

      // Typecasting userId to number for comparison with service.userId
      if (service.userId !== Number(userId)) {
        res.status(403).json({ message: 'You are not authorized to update this service' }); // Just call `res` without returning it
        return;
      }

      // Update the service
      service.name = name;
      service.description = description;
      service.price = price;
      await service.save();

      res.status(200).json({ message: 'Service updated successfully', service }); // Just call `res` without returning it
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' }); // Just call `res` without returning it
    }
  }
);

// Delete service route
router.delete(
  '/delete/:serviceId',
  authenticateToken,  // Protect route
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { serviceId } = req.params;
    const userId = req.user?.id; // Extract user id from the token

    try {
      // Find the service by ID and check if it belongs to the user
      const service = await Service.findOne({ where: { id: serviceId } });
      if (!service) {
        res.status(404).json({ message: 'Service not found' }); // Just call `res` without returning it
        return;
      }

      // Check if the service belongs to the logged-in user
      if (service.userId !== Number(userId)) {
        res.status(403).json({ message: 'You are not authorized to delete this service' }); // Just call `res` without returning it
        return;
      }

      // Delete the service
      await service.destroy();

      res.status(200).json({ message: 'Service deleted successfully' }); // Just call `res` without returning it
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' }); // Just call `res` without returning it
    }
  }
);

export default router;
