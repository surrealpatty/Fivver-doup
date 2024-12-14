// src/routes/dashboard.ts

import { Request, Response } from 'express';  // Importing Request and Response from express
import { UserPayload } from '../types';  // Import UserPayload from src/types/index.ts

// Handler for the dashboard route
const dashboardHandler = (req: Request, res: Response) => {
  // Safely cast req.user to UserPayload (since we know it's added by the authentication middleware)
  const user = req.user as UserPayload;

  // Return a JSON response with the user information
  res.json({ user });
};

export default dashboardHandler;
