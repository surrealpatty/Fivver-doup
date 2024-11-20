// src/routes/api.ts

import { Router, Request, Response } from 'express'; // Importing Router, Request, and Response from express
import Service from '../models/services'; // Ensure this is correct based on your model's file
import User from '../models/user'; // Ensure this is correct based on your model's file
import { ServiceCreationAttributes } from '../models/services'; // Correct import for Service creation attributes

const router = Router(); // Initialize the router

router.post('/services', async (req: Request, res: Response) => {
  // Destructuring the body of the request and specifying types for 'title', 'description', and 'price'
  const { userId, title, description, price }: ServiceCreationAttributes = req.body;

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the new service
    const service = await Service.create({
      title,       // 'title' from the request body
      description, // 'description' from the request body
      price,       // 'price' from the request body
      userId,      // 'userId' from the request body
    });

    // Return the newly created service
    return res.status(201).json(service);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router; // Export the router to be used in other parts of your application
