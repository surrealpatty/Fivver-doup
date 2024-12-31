import express from 'express';
import { ServiceController } from '../controllers/serviceController'; // Use named import for ServiceController
const router = express.Router();
// Define a route for services
router.get('/services', ServiceController.getServices); // Ensure this matches the route you're testing
export default router;
//# sourceMappingURL=service.js.map