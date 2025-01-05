import { Request, Response } from 'express';
import { AuthRequest } from '../types'; // Import AuthRequest interface to ensure correct typing
import { User } from '../models/user'; // Import User model to access user-related services

/**
 * Get the service profile for the authenticated user.
 * @param req - Request object, including user information from JWT.
 * @param res - Response object.
 * @returns The service data or an error message.
 */
export const getServiceProfile = async (req: AuthRequest, res: Response) => {
  try {
    // Access the authenticated user from the request (user attached by middleware)
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized, user not found.' });
    }

    // Fetch the user's service profile (replace with actual service fetching logic)
    const services = await User.findOne({
      where: { id: userId },  // Fetch user by ID (or adjust based on your DB schema)
      include: ['services'],  // Assuming there's a relationship between User and Service
    });

    if (!services) {
      return res.status(404).json({ message: 'No services found for this user.' });
    }

    // Return the services associated with the authenticated user
    return res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching user services:', error);
    return res.status(500).json({ message: 'Failed to fetch user services' });
  }
};

/**
 * Get all services (public endpoint).
 * @param req - Request object.
 * @param res - Response object.
 * @returns A list of available services.
 */
export const getServices = async (req: Request, res: Response) => {
  try {
    // Simulate getting services (replace with real database logic)
    const services = [
      { id: 1, title: 'Web Development' },
      { id: 2, title: 'Graphic Design' },
    ];

    return res.status(200).json(services); // Send the services data as a JSON response
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({ message: 'Failed to fetch services' });
  }
};
