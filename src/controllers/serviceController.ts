import { Request, Response } from 'express'; // Import necessary types
import { Service } from '../models/services'; // Adjust according to your model location
import { CustomAuthRequest } from '../types'; // Import the custom request type

export class ServiceController {
  // Method to handle access to premium services for paid users
  static premiumServiceAccess(req: CustomAuthRequest, res: Response): Response {
    const user = req.user; // user object is attached by authenticateToken middleware
    if (user?.role === 'paid') {
      return res.status(200).json({ message: 'Premium service access granted.' });
    }
    return res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
  }

  // Method to fetch all services (existing method)
  static async getServices(req: Request, res: Response): Promise<Response> {
    try {
      const services = await Service.findAll();  // Assuming you want to fetch all services
      return res.status(200).json(services);  // Send the services as the response
    } catch (error) {
      console.error('Error fetching services:', error);
      return res.status(500).json({ message: 'Internal server error while fetching services.' });
    }
  }
}
