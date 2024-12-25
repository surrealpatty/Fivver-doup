import express from 'express';
import { createService, getServices } from '../controllers/serviceController'; // Ensure correct function imports

const router = express.Router();

// Route to create a service
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body; // Assuming you're sending name and description in the request body
    const result = await createService({ name, description });
    res.status(201).json(result); // Return the created service with a 201 status
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
});

// Route to get all services
router.get('/', async (req, res) => {
  try {
    const result = await getServices();
    res.status(200).json(result); // Return the list of services with a 200 status
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
});

export default router;
