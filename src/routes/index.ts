import express, { Request, Response } from 'express'; // Import Request

// Create a router instance for handling service-related routes
const serviceRouter = express.Router();

// Define your service-related routes here
serviceRouter.get('/', (_: Request, res: Response) => { // Use underscore for unused params
  res.send('Service routes');
});

// Export the router as the default export
export default serviceRouter;
