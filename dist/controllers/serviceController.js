import { Service } from '../models/services';
// ServiceController class
export class ServiceController {
    // Define getServices as a static method
    static async getServices(req, res) {
        try {
            const services = await Service.findAll(); // Assuming you want to fetch all services
            return res.status(200).json(services); // Send the services as the response
        }
        catch (error) {
            console.error('Error fetching services:', error);
            return res.status(500).json({ message: 'Internal server error while fetching services.' });
        }
    }
}
//# sourceMappingURL=serviceController.js.map