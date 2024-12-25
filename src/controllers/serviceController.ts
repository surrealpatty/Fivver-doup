// src/controllers/servicesController.ts

import { Request, Response } from 'express'; // Import types for request and response
import { createService, getServices } from '../services/serviceService'; // Import the service layer functions

// Controller for creating a service
export const createServiceController = async (req: Request, res: Response) => {
  try {
    const { userId, title, description, price } = req.body;

    // Call the service layer to create a service
    const result = await createService({ userId, title, description, price });

    // Send success response
    res.status(201).json({
      message: result.message,
      serviceId: result.serviceId,
      title: result.title,
    });
  } catch (error) {
    // Handle errors and send failure response
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Unknown error occurred while creating the service.',
    });
  }
};

// Controller for fetching all services
export const getServicesController = async (req: Request, res: Response) => {
  try {
    // Call the service layer to get services
    const result = await getServices();

    // Send success response with services
    res.status(200).json(result);
  } catch (error) {
    // Handle errors and send failure response
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Unknown error occurred while fetching services.',
    });
  }
};
