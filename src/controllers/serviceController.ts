import { Request, Response } from 'express';

// Controller for fetching services (public endpoint)
export class ServiceController {
  // Get all services (public endpoint)
  static getServices = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Simulate fetching services (replace with actual DB logic)
      const services = [
        { id: 1, title: 'Web Development' },
        { id: 2, title: 'Graphic Design' },
      ];

      return res.status(200).json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      return res.status(500).json({ message: 'Failed to fetch services' });
    }
  };

  // Get service profile for an authenticated user
  static getServiceProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.user?.id; // Assuming user ID is set in req.user by middleware

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized, user not found.' });
      }

      // Simulate fetching user's service profile (replace with actual DB logic)
      const userServiceProfile = { id: userId, services: ['Web Development', 'SEO Services'] };

      return res.status(200).json(userServiceProfile);
    } catch (error) {
      console.error('Error fetching user service profile:', error);
      return res.status(500).json({ message: 'Failed to fetch user service profile' });
    }
  };

  // Handle premium service access (e.g., for paid users)
  static premiumServiceAccess = async (req: Request, res: Response): Promise<Response> => {
    try {
      return res.status(200).json({ message: 'Premium service access granted.' });
    } catch (error) {
      console.error('Error granting premium service access:', error);
      return res.status(500).json({ message: 'Failed to grant access to premium services' });
    }
  };
}
