import { Request, Response } from 'express';
import { User } from '../models/user';  // Named import
import { UserPayload } from '../types'; // Ensure UserPayload is correctly defined

// Extend the Request interface to include the user object, which may be undefined
interface AuthRequest extends Request {
  user?: UserPayload; // user is optional, can be undefined
}

// Example function for getting a service profile
export const getServiceProfile = async (req: AuthRequest, res: Response) => {
  try {
    // Check if the user object exists on the request
    const user = req.user;

    // If user is undefined or userId is not available, return an error
    if (!user || !user.id || typeof user.id !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing User ID in request' });
    }

    // Extract userId from user object
    const userId = user.id;

    // Fetch the service associated with the userId (adjust the logic if needed)
    const service = await User.findOne({ where: { id: userId } });

    // Check if service exists
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Send back the service data
    return res.json(service);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching service profile:', error);

    // Return a generic error message
    return res.status(500).json({ message: 'Internal server error' });
  }
};
