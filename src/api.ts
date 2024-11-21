import { Router, Request, Response } from 'express'; // Importing Router, Request, and Response from express
import Service from '../models/services'; // Import Service model
import User from '../models/user'; // Import User model
import { ServiceCreationAttributes } from '../models/services'; // Import the correct type for Service creation

const router = Router(); // Initialize the router

// Define the service creation route
router.post('/services', async (req: Request, res: Response): Promise<Response> => {
  // Destructure the necessary fields from the request body
  const { userId, title, description, price }: ServiceCreationAttributes = req.body;

  try {
    // Validate the incoming data
    if (!userId || !title || !description || price === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the new service
    const service = await Service.create({
      userId,       // 'userId' from the request body
      title,        // 'title' from the request body
      description,  // 'description' from the request body
      price,        // 'price' from the request body
    });

    // Return the newly created service
    return res.status(201).json(service);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router; // Export the router to be used in other parts of your application
