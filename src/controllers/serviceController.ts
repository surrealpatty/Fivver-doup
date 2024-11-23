// src/controllers/serviceController.ts
import { Request, Response } from 'express';
import Service from '../models/services';
import { UserPayload } from '../types';  // Correctly import UserPayload interface

// Define the AuthRequest interface extending the Request object to include user info
interface AuthRequest extends Request {
  user?: UserPayload;  // user is optional, can be undefined
}

// Controller to get the service profile associated with the authenticated user
export const getServiceProfile = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const user = req.user;  // Access the authenticated user from the request

    // Validate that the user is authenticated and has a valid user id
    if (!user || !user.id || typeof user.id !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing User ID in request' });
    }

    const userId = user.id;  // Extract the userId from the authenticated user

    // Find the service associated with the userId using Sequelize's findOne method
    const service = await Service.findOne({ where: { userId } });

    // If no service is found for the given user, return a 404 error
    if (!service) {
      return res.status(404).json({ message: 'Service not found for the given user' });
    }

    // If a service is found, return the service data
    return res.json(service);
  } catch (error) {
    // Log and handle any errors that occur during the process
    console.error('Error fetching service profile:', error);
    return res.status(500).json({ message: 'Internal server error fetching service profile' });
  }
};
