import { Router, Request, Response } from 'express'; // Importing Router, Request, and Response from express
import Service from '../models/services'; // Import Service model
import User from '../models/user'; // Import User model
import { ServiceCreationAttributes } from '../models/services'; // Import the correct type for Service creation

const router = Router(); // Initialize the router

// Service creation validation function
const validateServiceData = (data: ServiceCreationAttributes) => {
  const { userId, title, description, price } = data;
  if (!userId || !title || !description || price === undefined) {
    return { valid: false, message: 'Missing required fields' };
  }
  return { valid: true };
};

router.post('/path', async (req: Request, res: Response): Promise<Response> => {
  const { userId, title, description, price }: ServiceCreationAttributes = req.body; // Get data from request body

  const validation = validateServiceData({ userId, title, description, price }); // Use validation function
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message }); // Return validation error
  }

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // User not found error
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
    return res.status(500).json({ message: 'Internal server error' }); // Handle unexpected errors
  }
});

export default router; // Export the router to be used in other parts of your application
