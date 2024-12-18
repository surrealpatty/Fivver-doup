import express from 'express';
import Service from '../models/services'; // Correctly import the Service model
import { authenticateToken } from '../middlewares/authenticateToken'; // Import authenticateToken middleware
import { checkRole } from '../middlewares/roleMiddleware'; // Import checkRole middleware to verify user role
import { updateService } from '../controllers/serviceController'; // Import updateService from the controller
import { AuthRequest } from '../types'; // Import AuthRequest type for proper type inference

const router = express.Router();

// Premium service route accessible only to paid users
router.get(
  '/premium-service',
  authenticateToken,
  checkRole('paid'),
  (req: AuthRequest, res) => {
    const user = req.user; // Access `user` from req.user (type-safe)
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized access' }); // Ensure user exists
    }
    res
      .status(200)
      .json({
        message: `Welcome ${user.username}, you have access to the premium service.`,
      });
  }
);

// PUT route to update a service by ID
router.put('/:id', authenticateToken, checkRole('admin'), updateService); // Use the updateService function for PUT requests

// Example route to get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll(); // Fetch all services
    res.status(200).json(services); // Respond with status 200 and services
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error }); // Error handling
  }
});

// Example route to create a new service
router.post(
  '/create',
  authenticateToken,
  checkRole('admin'),
  async (req: AuthRequest, res) => {
    try {
      const { title, description, price, userId } = req.body; // Expecting these in the request body
      const service = await Service.create({
        title,
        description,
        price,
        userId,
      }); // Create a new service
      res.status(201).json(service); // Respond with created service
    } catch (error) {
      res.status(500).json({ message: 'Error creating service', error }); // Error handling
    }
  }
);

export default router;
