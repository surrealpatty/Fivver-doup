import { Router } from 'express';
import Service from '../models/services'; // Correctly import the Service model
import { updateService } from '../controllers/serviceController'; // Import updateService from the controller

const router = Router();

// Define the PUT route for updating a service by ID
router.put('/:id', updateService); // Use the updateService function for PUT requests

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
router.post('/create', async (req, res) => {
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
});

export default router;
