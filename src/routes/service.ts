import { Router, Request, Response, NextFunction } from 'express';
import Service from '@models/services';  // Ensure this import is correct
import { body, validationResult } from 'express-validator';
import authenticateToken from '@middlewares/authenticateToken';  // Use alias with the correct config

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
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {  // Correct return type: Promise<void>
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return; // Exit here if validation fails
    }

    const { name, description, price } = req.body;
    const { serviceId } = req.params;
    const userId = req.user?.id;  // Extract user id from the token

    try {
      // Find the service by ID and check if it belongs to the user
      const service = await Service.findOne({ where: { id: serviceId } });
      if (!service) {
        res.status(404).json({ message: 'Service not found' });
        return; // Exit here if service is not found
      }

      // Typecasting userId to number for comparison with service.userId
      if (service.userId !== Number(userId)) {
        res.status(403).json({ message: 'You are not authorized to update this service' });
        return; // Exit here if user is not authorized
      }

      // Update the service
      service.name = name;
      service.description = description;
      service.price = price;
      await service.save();

      res.status(200).json({ message: 'Service updated successfully', service });  // Send response here
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });  // Handle error response
    }
  }
);

export default router;
