// src/controllers/serviceController.ts
import { Request, Response } from 'express';
import Service from '../models/services';  // Correct import
import { UserPayload } from '../types'; // Ensure UserPayload is correctly defined

interface AuthRequest extends Request {
  user?: UserPayload; // user is optional, can be undefined
}

export const getServiceProfile = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const user = req.user;

    if (!user || !user.id || typeof user.id !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing User ID in request' });
    }

    const userId = user.id;

    // Query the service using the 'userId'
    const service = await Service.findOne({
      where: { userId } // This should work as 'userId' is defined in the Service model
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found for the given user' });
    }

    return res.json(service);
  } catch (error) {
    console.error('Error fetching service profile:', error);
    return res.status(500).json({ message: 'Internal server error fetching service profile' });
  }
};
