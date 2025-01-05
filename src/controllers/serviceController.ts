import { Request, Response } from 'express';

// Export the ServiceController class correctly
export class ServiceController {
  // Method for fetching all services (public endpoint)
  static getServices = async (req: Request, res: Response) => {
    try {
      // Simulate a list of services (you can replace this with your actual DB logic)
      const services = [
        { id: 1, title: 'Web Development' },
        { id: 2, title: 'Graphic Design' },
      ];

      return res.status(200).json(services); // Return services as JSON response
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch services' });
    }
  };

  // Method for getting the service profile of an authenticated user
  static getServiceProfile = async (req: Request, res: Response) => {
    try {
      // Assume the user ID is coming from a middleware, e.g., authentication
      const userId = req.user?.id; // Ensure that req.user is attached from the middleware
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized, user not found.' });
      }

      // Simulate fetching user service profile (replace with actual DB fetching logic)
      const userServiceProfile = { id: userId, services: ['Web Development', 'SEO Services'] }; // Simulated data

      return res.status(200).json(userServiceProfile);
    } catch (error) {
      console.error('Error fetching user services:', error);
      return res.status(500).json({ message: 'Failed to fetch user services' });
    }
  };

  // Method for handling premium service access
  static premiumServiceAccess = async (req: Request, res: Response) => {
    try {
      return res.status(200).json({ message: 'Premium service access granted.' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to grant access to premium services' });
    }
  };
}
