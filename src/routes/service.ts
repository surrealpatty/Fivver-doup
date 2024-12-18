import express, { Request, Response } from 'express';
import Service from '../models/services'; // Assuming you have a Service model for DB interaction

const router = express.Router();

// Example route to get all services
router.get('/', async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll(); // Fetch all services
    res.status(200).json(services); // Respond with status 200 and services
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error }); // Error handling
  }
});

// Example route to create a new service
router.post('/create', async (req: Request, res: Response) => {
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

// Route to update a service by ID (PUT /services/:id)
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;  // Extract service ID from request parameters
  const { title, description, price } = req.body;  // Extract new data from request body
  
  try {
    // Find the service by ID and update it
    const service = await Service.findByPk(id);  // Find service by primary key (ID)

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });  // Handle service not found
    }

    // Update the service fields
    service.title = title || service.title;
    service.description = description || service.description;
    service.price = price || service.price;

    await service.save();  // Save the updated service to the database

    res.status(200).json({ message: 'Service updated successfully', service });  // Respond with success
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error });  // Error handling
  }
});

export default router;
