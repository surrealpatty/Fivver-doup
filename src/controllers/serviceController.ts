// src/controllers/serviceController.ts

import { Request, Response } from 'express';
import { Service } from '../models/services';  // Correct import
import { UserPayload } from '../types'; // Ensure UserPayload is correctly defined

// Extend the Request interface to include the user object, which may be undefined
interface AuthRequest extends Request {
  user?: UserPayload; // user is optional, can be undefined
}

/**
 * Get the service profile for the authenticated user.
 * @param req - Request object, including user information from JWT.
 * @param res - Response object.
 * @returns The service data or an error message.
 */
export const getServiceProfile = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    // Ensure user object exists and has a valid id
    const user = req.user;

    if (!user || !user.id || typeof user.id !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing User ID in request' });
    }

    const userId = user.id;

    // Attempt to fetch the service linked to the userId
    const service = await Service.findOne({ where: { userId } });

    // If no service is found for the given userId, return a 404 error
    if (!service) {
      return res.status(404).json({ message: 'Service not found for the given user' });
    }

    // If the service is found, return it in the response
    return res.json(service);
  } catch (error) {
    // Log detailed error for debugging
    console.error('Error fetching service profile:', error);

    // Return a generic server error response
    return res.status(500).json({ message: 'Internal server error fetching service profile' });
  }
};
