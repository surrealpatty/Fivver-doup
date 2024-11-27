import express, { Request, Response } from 'express';

// Create a router instance for handling service-related routes
const serviceRouter = express.Router();

// Define your service-related routes here
serviceRouter.get('/', (req: Request, res: Response) => {
  res.send('Service routes');
});

// Export the router as the default export
export default serviceRouter;
